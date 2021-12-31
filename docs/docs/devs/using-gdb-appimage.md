# Using GDB with Linux AppImages (32 bit and 64 bit)

This guide is useful if for example you'd like to debug a 32 bit crash but cannot build a 32 bit PCSX2.


1. **Put your AppImage into a directory by itself**

   We'll call the AppImage `PCSX2.AppImage` and I'll assume you have a terminal in this directory.

2. **Extract the contents of the AppImage**

    You can do this by doing `./PCSX2.AppImage --appimage-extract`

    A new directory called `squashfs-root` should have been created.

3. **Run the AppImage normally**

   `./PCSX2.AppImage`

4. **Get the PID of the current PCSX2 instance**

   You can do `pidof PCSX2`.

   If there is more than one pid that shows up, you have more than one PCSX2 running!

   We'll call your running pid `<PID>`

5. **Attach GDB (during a fault or when PCSX2 is running normally, doesn't matter)**

   Note: In my case I have to run gdb as `sudo`

   `gdb squashfs-root/usr/bin/PCSX2 -p <PID>`

   `set sysroot ./squashfs-root`

   `set solib-search-path ./squashfs-root/usr/lib`

    The last two commands are due to the fact that the AppImage runs in a sanboxed area.
    It points gdb to where PCSX2 is going to look for libraries for example.

## The commands in-order are listed below:

`./PCSX2.AppImage --appimage-extract`

`./PCSX2.AppImage`

`pidof PCSX2`

`gdb squashfs-root/usr/bin/PCSX2 -p <PID>`

`set sysroot ./squashfs-root`

`set solib-search-path ./squashfs-root/usr/lib`

-- You now have GDB set up and connected to your PCSX2

