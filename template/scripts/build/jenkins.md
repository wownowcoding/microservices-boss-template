#### sit new
```
source /etc/profile >& /dev/null

if [ -f "./build.js" ];then
node build.js env=sit filePath=$WORKSPACE

#docker build
FULL_MOD_NAME=lifekh-mp-nodejs-mobile-boss-ssr-sit

zip -ryq $FULL_MOD_NAME.zip *

  if [ -f "./build-callback.js" ];then
  node build-callback.js
  else
  echo "没有构建回调!"
  fi

/opt/k8s-deploy-runner-for-dev/run.sh -f ${FULL_MOD_NAME}.zip >& /dev/null

else
echo "构建脚本不存在!"
fi

echo "============================ Build End! ============================"
```

#### sit old
```
source /etc/profile

if [ -f "./build.js" ];then
rm -rf node_modules/
node build.js env=sit filePath=$WORKSPACE

#docker build
FULL_MOD_NAME=lifekh-mp-nodejs-mobile-boss-ssr-sit

zip -ryq $FULL_MOD_NAME.zip *

/opt/k8s-deploy-runner-for-dev/run.sh -f ${FULL_MOD_NAME}.zip

else
echo "构建脚本不存在!"
fi
```
#### pre new
```
source /etc/profile mnt/fd >& /dev/null

if [ -f "./build.js" ];then
node build.js env=pre filePath=$WORKSPACE

#docker build
#FULL_MOD_NAME=lifekh-mp-nodejs-mobile-app-composition-sit
FULL_MOD_NAME=${JOB_BASE_NAME}

zip -ryq $FULL_MOD_NAME.zip *

  if [ -f "./build-callback.js" ];then
  node build-callback.js env=pre
  else
  echo "没有构建回调!"
  fi

/opt/k8s-deploy-runner-for-pre/run.sh -f ${FULL_MOD_NAME}.zip mnt/fd >& /dev/null

else
echo "构建脚本不存在!"
fi

node -e "console.log('\n============================ SUCCESS ============================')"
```

#### pre old
```
source /etc/profile

if [ -f "./build.js" ];then
rm -rf node_modules/
node build.js env=pre filePath=$WORKSPACE

#docker build
#FULL_MOD_NAME=lifekh-mp-nodejs-mobile-app-composition-sit
FULL_MOD_NAME=${JOB_BASE_NAME}

zip -ryq $FULL_MOD_NAME.zip *

/opt/k8s-deploy-runner-for-pre/run.sh -f ${FULL_MOD_NAME}.zip

else
echo "构建脚本不存在!"
fi
```

#### uat new
```
source /etc/profile >& /dev/null

if [ -f "./build.js" ];then
node build.js env=uat filePath=$WORKSPACE

#docker build
FULL_MOD_NAME=lifekh-mp-nodejs-mobile-boss-ssr-uat

zip -ryq $FULL_MOD_NAME.zip *

  if [ -f "./build-callback.js" ];then
  node build-callback.js
  else
  echo "没有构建回调!"
  fi

/opt/lifekh-base-docker-image-builder-uat/run.py -d ${FULL_MOD_NAME}.zip >& /dev/null

else
echo "构建脚本不存在!"
fi

echo "============================ Build End! ============================"
```

#### uat old
```
source /etc/profile

if [ -f "./build.js" ];then
rm -rf node_modules/
node build.js env=uat filePath=$WORKSPACE

#docker build
FULL_MOD_NAME=lifekh-mp-nodejs-mobile-boss-ssr-uat

zip -ryq $FULL_MOD_NAME.zip *

/opt/lifekh-base-docker-image-builder-uat/run.py -d ${FULL_MOD_NAME}.zip

else
echo "构建脚本不存在!"
fi
```

#### uat pro new
```
source /etc/profile >& /dev/null

if [ -f "./build.js" ];then
node build.js env=prod filePath=$WORKSPACE

#docker build
FULL_MOD_NAME=lifekh-mp-nodejs-mobile-boss-ssr-pro

zip -ryq $FULL_MOD_NAME.zip *

  if [ -f "./build-callback.js" ];then
  node build-callback.js
  else
  echo "没有构建回调!"
  fi

/opt/lifekh-base-docker-image-builder-pro/run.py -d ${FULL_MOD_NAME}.zip >& /dev/null

else
echo "构建脚本不存在!"
fi

echo "============================ Build End! ============================"
```

#### uat pro old
```
source /etc/profile

if [ -f "./build.js" ];then
rm -rf node_modules/
node build.js env=prod filePath=$WORKSPACE
else
echo "构建脚本不存在!"
exit 1
fi

#docker build
FULL_MOD_NAME=lifekh-mp-nodejs-mobile-boss-ssr-pro

zip -ry $FULL_MOD_NAME.zip *

/opt/lifekh-base-docker-image-builder-pro/run.py -d ${FULL_MOD_NAME}.zip
```

#### 金边 pro new
```
source /etc/profile >& /dev/null

if [ -f "./build.js" ];then
node build.js env=prod filePath=$WORKSPACE

#docker build
FULL_MOD_NAME=lifekh-mp-nodejs-mobile-boss-ssr-pro

zip -ryq $FULL_MOD_NAME.zip *

  if [ -f "./build-callback.js" ];then
  node build-callback.js
  else
  echo "没有构建回调!"
  fi

/opt/lifekh-base-docker-image-builder-pro/run.py -d ${FULL_MOD_NAME}.zip >& /dev/null

else
echo "构建脚本不存在!"
fi

echo "============================ Build End! ============================"
```

#### 金边 pro old
```
source /etc/profile

if [ -f "./build.js" ];then
rm -rf node_modules/
node build.js env=prod filePath=$WORKSPACE
else
echo "构建脚本不存在!"
exit 1
fi

#docker build
FULL_MOD_NAME=lifekh-mp-nodejs-mobile-boss-ssr-pro

zip -ryq $FULL_MOD_NAME.zip *

/opt/lifekh-base-docker-image-builder-pro/run.py -d ${FULL_MOD_NAME}.zip

```