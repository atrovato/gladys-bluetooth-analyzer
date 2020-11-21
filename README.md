# gladys-bluetooth-analyzer

This program allows to test your Bluetooth device with Gladys Bluetooth integration service.

## How do it work?

It retrieves the Bluetooth service from last Gladys version, to ensure Gladys compatibility.
Then it loads Blueooth devices, and try some specific functions on it.

## How to run?

```
git clone https://github.com/atrovato/gladys-bluetooth-analyzer.git
cd ./gladys-bluetooth-analyzer
npm install
npm start
```

And follow instructions.

## Noble library information

Please follow installation instructions according to your computer.
See https://github.com/abandonware/noble/blob/master/README.md

### Prerequisites

#### OS X

- Install [Xcode](https://itunes.apple.com/ca/app/xcode/id497799835?mt=12)

#### Linux

- Kernel version 3.6 or above
- `libbluetooth-dev`
- Run the following command to grant node the necessary privileges to read BLE data: `sudo setcap cap_net_raw+eip $(eval readlink -f $(which node))` ([Explanation](https://github.com/abandonware/noble#running-without-rootsudo-linux-specific))

##### Ubuntu, Debian, Raspbian

```sh
sudo apt-get install bluetooth bluez libbluetooth-dev libudev-dev
```

Make sure `node` is on your `PATH`. If it's not, some options:

- Symlink `nodejs` to `node`: `sudo ln -s /usr/bin/nodejs /usr/bin/node`
- [Install Node.js using the NodeSource package](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)

##### Fedora and other RPM-based distributions

```sh
sudo yum install bluez bluez-libs bluez-libs-devel
```

##### Intel Edison

See [Configure Intel Edison for Bluetooth LE (Smart) Development](http://rexstjohn.com/configure-intel-edison-for-bluetooth-le-smart-development/).

#### FreeBSD

Make sure you have GNU Make:

```sh
sudo pkg install gmake
```

Disable automatic loading of the default Bluetooth stack by putting [no-ubt.conf](https://gist.github.com/myfreeweb/44f4f3e791a057bc4f3619a166a03b87) into `/usr/local/etc/devd/no-ubt.conf` and restarting devd (`sudo service devd restart`).

Unload `ng_ubt` kernel module if already loaded:

```sh
sudo kldunload ng_ubt
```

Make sure you have read and write permissions on the `/dev/usb/*` device that corresponds to your Bluetooth adapter.

#### Windows

[node-gyp requirements for Windows](https://github.com/TooTallNate/node-gyp#installation)

Install the required tools and configurations using Microsoft's [windows-build-tools](https://github.com/felixrieseberg/windows-build-tools) from an elevated PowerShell or cmd.exe (run as Administrator).

```cmd
npm install --global --production windows-build-tools
```

[node-bluetooth-hci-socket prerequisites](https://github.com/abandonware/node-bluetooth-hci-socket#windows)

- Compatible Bluetooth 4.0 USB adapter
- [WinUSB](<https://msdn.microsoft.com/en-ca/library/windows/hardware/ff540196(v=vs.85).aspx>) driver setup for Bluetooth 4.0 USB adapter, using [Zadig tool](http://zadig.akeo.ie/)

See [@don](https://github.com/don)'s setup guide on [Bluetooth LE with Node.js and Noble on Windows](https://www.youtube.com/watch?v=mL9B8wuEdms&feature=youtu.be&t=1m46s)
