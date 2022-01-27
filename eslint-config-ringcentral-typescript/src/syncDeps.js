/* eslint-disable @typescript-eslint/no-var-requires,no-console */
const fs = require("fs");
const jsPkg = require(__dirname + "/../../eslint-config-ringcentral/package.json");
const tsPkg = require(__dirname + "/../package.json");
const { execSync } = require("child_process");

const fbVersion = tsPkg.dependencies["eslint-config-react-app"];

const fbPkg = JSON.parse(
    execSync("npm info --json eslint-config-react-app@" + fbVersion)
        .toString("utf8")
        .trim()
);

console.log(`Downloaded eslint-config-react-app@${fbVersion} pkg info`);

Object.keys(fbPkg.dependencies).forEach((key) => {
    const version = fbPkg.dependencies[key];
    if (jsPkg.devDependencies[key]) {
        jsPkg.devDependencies[key] = version;
        console.log("\x1b[35mJaveScript\x1b[0m", "-", key, ":", version);
    }
    if (jsPkg.dependencies[key]) {
        jsPkg.dependencies[key] = version;
        console.log("\x1b[35mJaveScript\x1b[0m", "-", key, ":", version);
    }
    if (tsPkg.dependencies[key]) {
        tsPkg.dependencies[key] = version;
        console.log("\x1b[36mTypeScript\x1b[0m", "-", key, ":", version);
    }
});

fs.writeFileSync(__dirname + "/../../eslint-config-ringcentral/package.json", JSON.stringify(jsPkg, null, 2));
fs.writeFileSync(__dirname + "/../package.json", JSON.stringify(tsPkg, null, 2));
