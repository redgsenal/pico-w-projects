# pico-w-projects
pico w projects

# reference
https://shawnhymel.com/2096/how-to-set-up-raspberry-pi-pico-c-c-toolchain-on-windows-with-vs-code/

# mingw32 make batch
echo mingw32-make %* > C:\VSARM\mingw\mingw32\bin\make.bat

# build process
cd /c/VSARM/sdk/pico/pico-examples/
mkdir build
cd build
cmake -G "MinGW Makefiles" ..
cd blink
make

# debug -> use putty and check the port