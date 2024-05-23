import configExpress from "./src/server/express/config.express";

const PORT = 3000;

try {
  const { app } = configExpress();

  app.listen(PORT, () => {
    console.log(`server running at://localhost:${PORT}`);
  });
} catch (e) {
  if (e instanceof Error) {
    console.error(e.message);
  }
}
