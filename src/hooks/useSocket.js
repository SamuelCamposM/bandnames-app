export const useSocket = () => {
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io("http://localhost:4000/", {
      reconnectionDelayMax: 10000,
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);
  return { socketRef };
};
