import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//  Укажите правильный путь к вашему slice
import { socket } from "../socket/socket";
import { addNotification } from "../store/notificationsSlice";
// Предполагается, что у вас есть настроенный и экспортированный объект socket

const useNotificationSubscription = () => {
  // Создаем отдельный хук для подписки на уведомления
  const dispatch = useDispatch();
  const select = useSelector((state) => ({
    isAuth: state.auth.isAuth,
    userId: state.auth.myId, //  Получаем userId
  }));

  useEffect(() => {
    if (select.isAuth && select.userId) {
      //  Проверяем, что пользователь аутентифицирован И userId существует
      //  Обновляем параметры query (если они еще не установлены)
      if (socket.io.opts.query === undefined) {
        socket.io.opts.query = {};
      }
      socket.io.opts.query.userId = String(select.userId); //  Передаем userId в параметрах запроса
      socket.connect(); //  Переподключаемся к сокету, чтобы применить изменения

      const newNotificationHandler = (notification) => {
        debugger;
        dispatch(addNotification(notification));
      };

      socket.on("new_notification", newNotificationHandler);

      return () => {
        socket.off("new_notification", newNotificationHandler);
        //  Необязательно:  socket.disconnect() //  Отключаем сокет при размонтировании
      };
    } else {
      //  Если пользователь не аутентифицирован, отключаем сокет (если он подключен)
      if (socket.connected) {
        socket.disconnect();
      }
    }
  }, [select.isAuth, select.userId]); // Добавляем userId в зависимости, чтобы переподключаться при изменении
  //  Удалите userId, если у вас есть проблемы с повторным подключением, но тогда уведомления не будут работать, если myId изменится
};

export default useNotificationSubscription;
