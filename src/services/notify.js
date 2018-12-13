export default {
    confirm(snotify, { closeOnClick = false, pauseOnHover = true, position = 'rightCenter', ...config }) {
        return new Promise((res, rej) => {
            snotify.confirm(config.body, config.title, {
                closeOnClick: closeOnClick,
                pauseOnHover: pauseOnHover,
                position: position,
                buttons: [
                    {
                        text: config.buttons.success,
                        action: (toast) => {
                            snotify.remove(toast.id);
                            res(true);
                        }
                    },
                    {
                        text: config.buttons.error,
                        action: (toast) => {
                            snotify.remove(toast.id);
                            rej(false);
                        }
                    }
                ]
            });
        });
    }
}