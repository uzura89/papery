module.exports = {
  apps: [
    {
      name: "papery",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
