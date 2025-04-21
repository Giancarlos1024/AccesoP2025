module.exports = {
  apps: [
    {
      name: "nodered",
      script: "C:/Users/Ryzen/AppData/Roaming/npm/node_modules/node-red/red.js",
      args: "-v",
      interpreter: "node",
      watch: false,
      autorestart: true,
      error_file: "./logs/nodered-error.log",
      out_file: "./logs/nodered-out.log",
      log_date_format: "YYYY-MM-DD HH:mm Z"
    }
  ]
};
