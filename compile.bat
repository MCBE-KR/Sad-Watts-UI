chcp 65001
call tsc

rmdir "C:\Users\%username%\AppData\Local\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang\development_behavior_packs\생각하지 않는 나(B)"
rmdir  "C:\Users\%username%\AppData\Local\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang\development_resource_packs\생각하지 않는 나(R)"

mkdir "C:\Users\%username%\AppData\Local\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang\development_behavior_packs\생각하지 않는 나(B)"
mkdir "C:\Users\%username%\AppData\Local\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang\development_resource_packs\생각하지 않는 나(R)"

xcopy ".\테스트 코드\애드온\생각하지 않는 나[B]" "C:\Users\%username%\AppData\Local\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang\development_behavior_packs\생각하지 않는 나(B)" /E /y
xcopy ".\생각하지 않는 나[R]" "C:\Users\%username%\AppData\Local\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang\development_resource_packs\생각하지 않는 나(R)" /E /y