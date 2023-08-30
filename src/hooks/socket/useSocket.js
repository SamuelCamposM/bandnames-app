import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

export const useSocket = (serverPath) => {
  const socket = useMemo(
    () =>
      io(serverPath, {
        reconnectionDelayMax: 10000,
      }),
    [serverPath]
  );
  const [online, setonline] = useState(false);
  useEffect(() => {
    socket.on("disconnect", () => {
      setonline(false);
    });
  }, []);
  useEffect(() => {
    socket.on("connect", () => {
      setonline(true);
    });
  }, []);
  return { socket, online };
};
