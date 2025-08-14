rm -rf ../www
rm -rf ../android
npm install @capacitor/android
npx cap add android
npx npm run build --  --configuration=production
npx cap sync --inline
npx cap open android
#cd /opt/android-studio/bin/ && ./studio.sh
