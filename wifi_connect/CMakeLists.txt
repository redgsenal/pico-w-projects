cmake_minimum_required(VERSION 3.13)

include(pico_sdk_import.cmake)

project(wifi_connect C CXX ASM)
set(CMAKE_C_STANDARD 11)
set(CMAKE_CXX_STANDARD 17)
set(PICO_BOARD pico_w)

pico_sdk_init()

add_executable(wifi_connect
    wifi_connect.c
)

pico_enable_stdio_usb(wifi_connect 1)
pico_enable_stdio_uart(wifi_connect 1)
pico_add_extra_outputs(wifi_connect)
target_include_directories(wifi_connect PRIVATE ${CMAKE_CURRENT_LIST_DIR} )
target_link_libraries(wifi_connect
    pico_cyw43_arch_lwip_threadsafe_background 
    pico_stdlib
)