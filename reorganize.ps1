Copy-Item -Path "IKYA-gig-workers-app/package.json" -Destination "package.json" -Force
Copy-Item -Path "IKYA-gig-workers-app/tsconfig.json" -Destination "tsconfig.json" -Force
Move-Item -Path "IKYA-gig-workers-app/App.tsx" -Destination "." -Force
Move-Item -Path "IKYA-gig-workers-app/app.json" -Destination "." -Force
Move-Item -Path "IKYA-gig-workers-app/babel.config.js" -Destination "." -Force
Move-Item -Path "IKYA-gig-workers-app/index.js" -Destination "." -Force
Move-Item -Path "IKYA-gig-workers-app/package-lock.json" -Destination "." -Force
Move-Item -Path "IKYA-gig-workers-app/.expo" -Destination "." -Force
Move-Item -Path "IKYA-gig-workers-app/android" -Destination "." -Force

New-Item -ItemType Directory -Path "src" -Force
Move-Item -Path "IKYA-gig-workers-app/src/src/services/*" -Destination "src/" -Force
Remove-Item -Path "IKYA-gig-workers-app" -Recurse -Force
