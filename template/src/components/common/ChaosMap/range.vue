<!--
 * @Description: 谷歌地图选择范围
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
            <!-- <input v-if="isEdit" id="searchInput" v-model="searchValue" type="text" :placeholder="$t('store.map_plh')" /> -->
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
const blue = require('./icon/blue.png');
const gray = require('./icon/gray.png');
const black = require('./icon/black.png');
export default {
    name: 'ChaosMap',
    props: {
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
            ]
        },
        markers: {
            type: Array,
            default: () => []
        },
        // 可编辑的范围参数
        editRegionValue: {
            type: Array,
            default: () => []
        },
        storeMarker: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            config: {
                center: { lng: 104.921023, lat: 11.5698 }, // 默认金边市中心坐标
                // center: { lng: 113.47662449, lat: 23.09690464 }, // 默认金边市中心坐标
                zoom: 16,
                disableDefaultUI: !this.isEdit, // 为了关闭默认控件集,设置地图的disableDefaultUI的属性为true
                options: {
                  gestureHandling: "greedy", // 启用缩放和平移
                },
                mapTypeControl: false, // 关闭地图类型切换
                streetViewControl: false,
                language: "en", // 语言可选值：en，zh_en, zh_cn
                // mapTypeId: "hybrid", // hybrid包含卫星和地名
            },
            searchValue: '', // 搜索框数据
            map: null, // 地图主体
            marker: [], // 标记物
            geocoder: null,
            searchBox: null, // 搜索框
            bermudaTriangle: {
                detail: [],
                edit: []
            }, // 多边形-区域
            mapLoadStatus: 0, // 地图资源加载成功标识, 0 加载中,1 加载成功,2 加载失败
            blue,
            gray,
            black,
            bounds: null
        }
    },
    watch: {
        markers: {
            handler(val) {
                if (this.map) {
                    this.deleteMarker();
                    val.forEach((item, index) => {
                        this.initMarker(item, index)
                    })
                    console.log('watch', 'markers')
                    
                }
            },
            deep: true,
        },
        regionValue: {
            handler(val) {
                if (this.map) {
                    this.initRegion(val, 'detail')
                }
                console.log('watch', 'regionValue')

            },
            deep: true,
        },
        // 只在地图可编辑态下生成
        editRegionValue: {
            handler(val) {
                if (!this.isEdit) {
                    return
                }
                if (this.map) {
                    const center = this.calcMapCenter(val);
                    this.$set(this.config, 'center', center);
                    console.log('watch', 'editRegionValue')
                    this.initRegion(val, 'edit')
                }
            },
            deep: true,
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
            this.bounds = new google.maps.LatLngBounds();
            if (this.isEdit) {
                // 生成搜索框
                this.initGeocoder();
                // 添加标记
                if (this.markers.length) {
                    this.markers.forEach((item, index) => {
                        this.initMarker(item, index)
                    })
                }
                // 添加可编辑区域
                if (this.editRegionValue.length) {
                    this.initRegion(this.editRegionValue, 'edit')
                }
                // 添加展示区域
                if (this.regionValue.length) {
                    this.initRegion(this.regionValue, 'detail')
                }
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
            // Poin the marker by store lat/lon
            if (this.storeMarker) {
                new google.maps.Marker({
                    position: this.storeMarker,
                    map: this.map
                });

                self.handleSaveCenterData(this.storeMarker);
            }
        },
        // 生成标记
        initMarker(item, index) {
            const icon = this[item.type]
            let self = this;
            this.marker[index] = new google.maps.Marker({
                position: item.coord,
                map: this.map,
                draggable: false, // 可拖动
                title: item.storeName,
                icon
            });
            // 保证全部坐标在地图可视范围内展示
            this.bounds.extend(new google.maps.LatLng(item.coord.lat, item.coord.lng));
            this.map.fitBounds(this.bounds);
            // 标记添加移动事件监听，记录移动后的坐标
            this.marker[index].addListener('click', function (e) {
                self.$emit('handleClickStore', item)
            })
        },
        // 添加搜索功能
        initGeocoder() {
            let self = this
            this.geocoder = new google.maps.Geocoder();
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

                // self.deleteMarker()

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
        // 删除标记
        deleteMarker() {
            this.marker.forEach(item => {
                item.setMap(null);
            })
        },
        // 保存地址
        handleSaveCenterData(latLng) {
            this.map.setCenter(latLng);
            this.$set(this.config, 'center', latLng);
            // this.handleSetvalue();
        },
        // 初始化可选区域
        initRegion(regionValue, type='detail') {
            // 范围区域可编辑状态，type==='edit' 可编辑，区域框为绿色； type==='detail' 不可编辑，区域框颜色为紫色
            const isEdit = type === 'edit';
            // 新建多边形
            const index = this.bermudaTriangle[type].length;
            this.bermudaTriangle[type][index] = new google.maps.Polygon({
                paths: regionValue, // 闭环的多边形坐标的有序数列
                strokeColor: isEdit?'#4169E1':'#7081ff',  // 边框颜色
                strokeOpacity: 0.8, // 边框透明度
                strokeWeight: 2, // 边框宽度
                fillColor: isEdit?'#4169E1':'#7081ff', // 图形填充颜色
                fillOpacity: 0.35, // 图形透明度
                draggable: isEdit,  // 图形是否可拖动
                //  @geodesic
                //  如果为true，则多边形的边缘将被解释为测地线，并将遵循地球的曲率。
                    //	如果为false，则多边形的边缘在屏幕空间中呈现为直线。
                    //  请注意，随着相对于地球表面的尺寸保持不变，拖动时测地线多边形的形状可能会发生变化。
                    //  默认为false。
                geodesic: false,
                editable: isEdit // 图形是否可编辑
            });
            this.bermudaTriangle[type][index].setMap(this.map); //重新塞入已保存的图形坐标
            // 保证全部坐标在地图可视范围内展示
            regionValue.forEach((item) => {
                this.bounds.extend(new google.maps.LatLng(item.lat, item.lng));
            })
            console.log('initRegion', this.bounds)
            this.map.fitBounds(this.bounds);
            // 在图形上添加事件侦听器(编辑时取值)
            let _ = this;
            if (isEdit) {
                const bermudaTriangle = this.bermudaTriangle['edit'][0]
                const path = bermudaTriangle.getPath()
                google.maps.event.addListener(path, 'insert_at', function(index, obj) {
                    const items = path.getArray();
                    let result = []
                    items.forEach((item, index) => {
                        result.push({lat: item.lat(), lng: item.lng()})
                    })
                    _.$emit("update:region", result)
                });
                google.maps.event.addListener(path, 'set_at', function(index, obj) {
                    const items = path.getArray();
                    let result = []
                    items.forEach((item, index) => {
                        result.push({lat: item.lat(), lng: item.lng()})
                    })
                    _.$emit("update:region", result)
                });
            }


        },
        // 删除多边形
        handleDeleteRegion(key, index) {
            if (this.bermudaTriangle[key][index]) {
                this.bermudaTriangle[key][index].setMap(null);
                this.bermudaTriangle[key].splice(index, 1);
            }
        },
        // 计算区域中心点
        calcMapCenter(region) {
            const len = region.length;
            let totalng = 0;
            let totalLat = 0;
            region.forEach(item => {
                totalng += item.lng;
                totalLat += item.lat;
            });
            const lng = (totalng / len).toFixed(this.fixed) - 0;
            const lat = (totalLat / len).toFixed(this.fixed) - 0;
            return {lng, lat};
        },
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
