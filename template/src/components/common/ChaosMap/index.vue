<!--
 * @Description: 谷歌地图v0.0.1版本
 * @Author: Rico.刘一飞
 * @Date: 2019-11-19 10:49:28
 * @LastEditors: Rico.刘一飞
 * @LastEditTime: 2019-11-28 14:32:36
 -->
<template>
    <div class="ChaosMap">
        <!-- 地图资源加载成功标识mapLoadStatus, 0 加载中,1 加载成功,2 加载失败 -->
        <!-- 加载成功 -->
        <!-- 为了避免出现加载完js后找不到map载体,故改成vshow而不是vif -->
        <div v-show="mapLoadStatus == 1">
            <div id="map" :style="{height: height + 'px'}"></div>
            <input v-if="isEdit" id="searchInput" v-model="searchValue" type="text" @change="handleSearchChange" :placeholder="$t('store.map_plh')" />
            <Icon v-if="isEdit" ref="searchBtn" id="searchBtn" @click="handleSearch" type="md-search" />
        </div>
        <!-- 加载还未成功 -->
        <div v-if="mapLoadStatus !=1" id="loadingWrapper" :style="{height: height + 'px'}">
            <Spin fix>
                <!-- 加载中 -->
                <div v-if="mapLoadStatus == 0">
                    <Icon type="ios-loading" size="24" class="spin-icon-load"></Icon>
                    <div>{{$t('utils.loading')}}</div>
                </div>
                <!-- 加载失败 -->
                <div v-else>
                    <Icon type="md-close-circle" size="24"></Icon>
                    <div>{{$t('utils.map_load_failed')}}</div>
                </div>
            </Spin>
        </div>
    </div>
</template>
<script>
import loadJs from './loadJs';
export default {
    name: 'ChaosMap',
    props: {
        value: {
            type: Object
        },
        fixed: {
            type: Number,
            default: 12   // 坐标数据保留几位小数，默认6
        },
        height: {
            type: Number,
            default: 500
        },
        isEdit: {
            type: Boolean,
            default: true
        },
        regionValue: {
            type: Array,
            default: () => [
                // {lat: 11.577058, lng: 104.887635},
                // {lat: 11.561612, lng: 104.884202},
                // {lat: 11.538928, lng: 104.890255},
                // {lat: 11.533892, lng: 104.901435},
                // {lat: 11.540799, lng: 104.935617},
                // {lat: 11.543267, lng: 104.941561},
                // {lat: 11.547292, lng: 104.946046},
                // {lat: 11.556349, lng: 104.948149},
                // {lat: 11.563701, lng: 104.937248},
                // {lat: 11.576721, lng: 104.928322}
            ]
        }
    },
    data() {
        return {
            config: {
                center: { lng: 104.921023, lat: 11.5698 }, // 默认金边市中心坐标
                zoom: 16,
                disableDefaultUI: !this.isEdit, // 为了关闭默认控件集,设置地图的disableDefaultUI的属性为true
                gestureHandling: "greedy", // 启用缩放和平移
                mapTypeControl: false, // 关闭地图类型切换
                streetViewControl: false,
                language: "en", // 语言可选值：en，zh_en, zh_cn
                // mapTypeId: "hybrid", // hybrid包含卫星和地名
            },
            searchValue: '', // 搜索框数据

            map: null, // 地图主体
            marker: null, // 标记物
            markers: [],
            geocoder: null,
            searchBox: null, // 搜索框
            bermudaTriangle: null, // 多边形-区域
            mapLoadStatus: 0, // 地图资源加载成功标识, 0 加载中,1 加载成功,2 加载失败
        }
    },
    model: {
        prop: 'value',
        event: 'handleSetvalue'
    },
    watch: {
        value: {
            handler(val = {}) {
                if (!window.google) return
                let self = this
                // 数据初始化
                let result = {}
                if (!val.lng || !val.lat) {
                    result = { lng: 104.921023, lat: 11.5698 }
                } else {
                    result = {
                        lng: Number(val.lng),
                        lat: Number(val.lat),
                    }
                }
                this.$nextTick(() => {
                    self.config.center = result;
                    self.deleteMarker();
                    self.map.setCenter(result);
                    self.initMarker();
                    // self.geocodeLatLng(result)
                })
            },
            deep: true,
            // immediate: true
        }
    },
    async mounted() {
        try {
            await loadJs()
            this.init()
        } catch (error) {
            console.log("TCL: mounted -> error", error)
            this.mapLoadStatus = 2
            console.log('map load failed!');
        }
    },
    methods: {
        init() {
            this.mapLoadStatus = 1
            // 生成地图
            this.initMap();
            // 添加标记
            this.initMarker();
            // 生成搜索框
            if (this.isEdit) {
                this.initGeocoder();
            }
            // 添加范围
            // this.initRegion();
        },
        // 生成地图
        initMap() {
            let self = this;
            this.map = new google.maps.Map(document.querySelector('#map'), {
                ...this.config
            });
            if (!this.isEdit) {
                return
            }
            // 地图添加click事件监听，修改标记位置
            this.map.addListener('click', function (e) {
                let latLng = {
                    lng: e.latLng.lng(),
                    lat: e.latLng.lat()
                }
                self.config.center = latLng;
                self.handleSaveCenterData(latLng);
                self.deleteMarker();
                self.initMarker();
                self.geocodeLatLng(latLng)
            });
        },
        // 生成标记
        initMarker() {
            let self = this;
            this.marker = new google.maps.Marker({
                position: this.config.center,
                map: this.map,
                draggable: self.isEdit, // 可拖动
                title: 'Hello',
            });
            // 标记添加移动事件监听，记录移动后的坐标
            this.marker.addListener('dragend', function (e) {
                let latLng = {
                    lng: e.latLng.lng(),
                    lat: e.latLng.lat()
                }
                self.handleSaveCenterData(latLng)
                self.geocodeLatLng(latLng)
            })
        },
        // 添加搜索功能
        initGeocoder() {
            let self = this
            if (!this.geocoder) {
                this.geocoder = new google.maps.Geocoder();
            }
            let input = document.querySelector('#searchInput');
            this.searchBox = new google.maps.places.SearchBox(input);

            this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

            // 将搜索框结果偏向当前地图的视口
            this.map.addListener('bounds_changed', function () {
                self.searchBox.setBounds(self.map.getBounds());
            });
            this.searchBox.addListener('places_changed', function () {
                self.$emit("update:placeChange", input.value)
                let places = self.searchBox.getPlaces();

                if (places.length == 0) {
                    return;
                }

                self.deleteMarker()

                // For each place, get the icon, name and location.
                var bounds = new google.maps.LatLngBounds();
                places.forEach(function (place) {
                    if (!place.geometry) {
                        console.log("Returned place contains no geometry");
                        return;
                    }
                    var icon = {
                        url: place.icon,
                        size: new google.maps.Size(71, 71),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(17, 34),
                        scaledSize: new google.maps.Size(25, 25)
                    };

                    let latLng = {
                        lng: place.geometry.location.lng(),
                        lat: place.geometry.location.lat()
                    };

                    self.handleSaveCenterData(latLng);
                    self.deleteMarker();
                    self.initMarker();

                    if (place.geometry.viewport) {
                        // Only geocodes have viewport.
                        bounds.union(place.geometry.viewport);
                    } else {
                        bounds.extend(place.geometry.location);
                    }
                });
                self.map.fitBounds(bounds);
            });
        },
        // 地理位置反编码
        geocodeLatLng(latlng) {
            const self = this;
            if (!this.geocoder) {
                this.geocoder = new google.maps.Geocoder();
            }
            this.geocoder.geocode({'location': latlng}, function(results, status) {
                if (status === 'OK') {
                    if (results[0]) {
                        const target = results[0].formatted_address;
                        if (target) {
                            self.searchValue = target;
                            self.$emit("update:placeChange", target)
                        }
                    } else {
                        window.alert('No results found');
                    }
                } else {
                    window.alert('Geocoder failed due to: ' + status);
                }
            });

        },
        // 点击搜索
        handleSearch() {
            let self = this;
            this.geocoder.geocode({'address': this.searchValue}, function(results, status) {
                if (status === 'OK') {
                    let latLng = {
                        lng: results[0].geometry.location.lng(),
                        lat: results[0].geometry.location.lat()
                    };
                    self.handleSaveCenterData(latLng);
                    self.deleteMarker();
                    self.initMarker();
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        },
        // 搜索框内容改变
        handleSearchChange() {
            this.$emit("update:placeChange", this.searchValue)
        },
        // 删除标记
        deleteMarker() {
            this.marker.setMap(null);
        },
        // 设置model值
        handleSetvalue() {
            let { lat = 0, lng = 0 } = this.config.center;
            this.$emit('handleSetvalue', { lat: lat.toFixed(this.fixed), lng: lng.toFixed(this.fixed) })
        },
        // 保存地址
        handleSaveCenterData(latLng) {
            this.map.setCenter(latLng);
            this.$set(this.config, 'center', latLng);
            this.handleSetvalue();
        },
        // 初始化可选区域
        initRegion() {
            // 新建多边形
            this.bermudaTriangle = new google.maps.Polygon({
                paths: this.regionValue, // 闭环的多边形坐标的有序数列
                strokeColor: '#7081ff',  // 边框颜色
                strokeOpacity: 0.8, // 边框透明度
                strokeWeight: 2, // 边框宽度
                fillColor: '#7081ff', // 图形填充颜色
                fillOpacity: 0.35, // 图形透明度
                draggable: true,  // 图形是否可拖动
                //  @geodesic
                //  如果为true，则多边形的边缘将被解释为测地线，并将遵循地球的曲率。
                    //	如果为false，则多边形的边缘在屏幕空间中呈现为直线。
                    //  请注意，随着相对于地球表面的尺寸保持不变，拖动时测地线多边形的形状可能会发生变化。
                    //  默认为false。
                geodesic: false,
                editable: true // 图形是否可编辑
            });
            this.bermudaTriangle.setMap(this.map); //重新塞入已保存的图形坐标
            // 在图形上添加事件侦听器(编辑时取值)
            let _ = this;
            google.maps.event.addListener(this.bermudaTriangle.getPath(), 'insert_at', function(index, obj) {
                const {i} = _.bermudaTriangle.getPath();
                let result = []
                i.forEach((item, index) => {
                    result.push({lat: item.lat(), lng: item.lng()})
                })
            });
            google.maps.event.addListener(this.bermudaTriangle.getPath(), 'set_at', function(index, obj) {
                const {i} = _.bermudaTriangle.getPath();
                let result = []
                i.forEach((item, index) => {
                    result.push({lat: item.lat(), lng: item.lng()})
                })
            });
            // const isOverlap = new google.maps.LatLngBounds(this.regionValue);
        }
    }
};
</script>
<style lang="stylus" scoped>
.ChaosMap
    position relative
    width 100%
    #loadingWrapper
        position relative
        background-color rgba(0, 0, 0, 1)
    #map
        width 100%
        display block
    #searchInput
        margin 14px 10px
        padding 2px 8px
        width 260px
        height 32px
        border 1px solid transparent
        border-radius 2px 0 0 2px
        box-sizing border-box
        -moz-box-sizing border-box
        outline none
        box-shadow 0 2px 6px rgba(0, 0, 0, 0.3)
    #searchBtn
        position absolute
        top 0
        left 230px
        margin 15px 10px
        font-size 28px
        cursor pointer
        z-index 1
.spin-icon-load
    animation spin 1s linear infinite
@keyframes spin
    from
        transform rotate(0deg)
    50%
        transform rotate(180deg)
    to
        transform rotate(360deg)
</style>
