const BetterStreamChat = {
  activeInstance: null,
  settingsDiv: null,
  isSettingsNewWindow: false,
  changelog: '',
  async init() {
    let changelogLabels = {
      added: '<span class="label" style="color: var(--wasd-color-text-prime);background: none;font-weight: 600;">Добавлено</span>',
      optimized: '<span class="label" style="color: var(--wasd-color-text-prime);background: none;font-weight: 600;">Оптимизировано</span>',
      changed: '<span class="label" style="color: var(--wasd-color-text-prime);background: none;font-weight: 600;">Изменено</span>',
      fixed: '<span class="label" style="color: var(--wasd-color-text-prime);background: none;font-weight: 600;">Исправлено</span>',
      removed: '<span class="label" style="color: var(--wasd-color-text-prime);background: none;font-weight: 600;">Удалено</span>',
      fixedwasd: '<span class="label" style="color: var(--wasd-color-text-prime);background: none;font-weight: 600;">Исправлено (Мешает работе WASD.TV)</span>'
    };
    let changelogList = [
      {
        version: '1.5.3',
        date: '2022-03-22',
        items: [{
          text: [
            `Выделение - Роль пользователя - Цвет для WASD партнёра.`
          ],
          label: 'added'
        }, {
          text: [
            `BetterWASD.`
          ],
          label: 'optimized'
        }]
      }, {
        version: '1.5.2',
        date: '2022-03-19',
        items: [{
          text: [
            `7TV.`,
            `BetterTTV.`,
            `FrankerFaceZ.`
          ],
          label: 'fixed'
        }]
      }, {
        version: '1.5.1',
        date: '2022-03-19',
        items: [{
          text: [
            `Выделение - Термины.`,
            `Значки подписчика.`
          ],
          label: 'fixed'
        }, {
          text: [
            `Разделитель строк в чате.`,
            `Добавить в контекст меню сообщения "Добавить в ЧС".`
          ],
          label: 'added'
        }, {
          text: [
            `Фильтрация.`,
            `Значки.`,
            `WebSocket.`
          ],
          label: 'optimized'
        }]
      }, {
        version: '1.5.0',
        date: '2022-02-25',
        items: [{
          text: [
            `Cкрыть "стикеры / смайлы" в панели ввода текста.`,
            `Скрыть "поддержать" в панели ввода текста.`,
            `Переместить кнопку 'Скрыть чат' в заголовок чата`
          ],
          label: 'fixed'
        }, {
          text: [
            `Анимированные эмоции.`
          ],
          label: 'removed'
        }, {
          text: [
            `Показать значки партнера.`,
            `Выделять сообщения, упоминающие вас.`,
            `Цвет сообщения, упоминающие вас.`
          ],
          label: 'added'
        }, {
          text: [
            `Опция BWASD|BTTV|FFZ|7TV в меню смайликов в чате.`
          ],
          label: 'optimized'
        }]
      }, {
        version: '1.4.9',
        date: '2022-02-24',
        items: [{
          text: [
            `Выделять сообщения, упоминающие вас.`,
            `Цвет сообщения, упоминающие вас.`
          ],
          label: 'removed'
        }]
      }, {
        version: '1.4.8',
        date: '2022-02-23',
        items: [{
          text: [
            `Карточка пользователя - Монеты.`,
            `Скрыть оверлей над проигрывателем.`,
            `Заглушить или включить звук проигрывателя путём щелчка по средней кнопке мыши.`
          ],
          label: 'fixed'
        }]
      }, {
        version: '1.4.7',
        date: '2022-02-14',
        items: [{
          text: [
            `Поменять панель подарков и информацию о стриме местами.`
          ],
          label: 'fixed'
        }, {
          text: [
            `BWASD значок пользователя.`,
            `Переместить кнопку 'Скрыть чат' в заголовок чата.`
          ],
          label: 'optimized'
        }, {
          text: [
            `Карточка пользователя - Монеты.`,
            `BWASD цвет имени пользователя.`,
            `Сохранять последнюю позицию карточки пользователя.`,
            `Добавить значок скопировать сообщение.`
          ],
          label: 'added'
        }, {
          text: [
            `Нормализовать скопированное сообщение.`
          ],
          label: 'removed'
        }]
      }, {
        version: '1.4.6',
        date: '2022-01-22',
        items: [{
          text: [
            `Съехала кнопка 'Лайк' в постах.`
          ],
          label: 'fixedwasd'
        }, {
          text: [
            `WebSocket.`
          ],
          label: 'optimized'
        },{
          text: [
            `Смайлики BWASD в чате.`,
            `Опция BWASD в меню смайликов в чате.`
          ],
          label: 'added'
        }, {
          text: [
            `Исправить ссылки в чате.`
          ],
          label: 'changed'
        }]
      }, {
        version: '1.4.5.1',
        date: '2022-01-17',
        items: [{
          text: [
            `Не действительна кнопка 'Пожаловаться'.`
          ],
          label: 'fixedwasd'
        }, {
          text: [
            `WebSocket.`
          ],
          label: 'optimized'
        }]
      }, {
        version: '1.4.5',
        date: '2022-01-14',
        items: [{
          text: [
            `Автовоспроизведение предпросмотра стримера в стриминговой.`
          ],
          label: 'added'
        }, {
          text: [
            `Аптайм трансляции.`
          ],
          label: 'changed'
        }]
      }, {
        version: '1.4.4',
        date: '2022-01-14',
        items: [{
          text: [
            `Нормализовать скопированное сообщение.`,
            `Переместить кнопку 'Скрыть чат' в заголовок чата.`,
            `Поменять панель подарков и информацию о стриме местами.`
          ],
          label: 'added'
        }, {
          text: [
            `Чат для OBS.`
          ],
          label: 'changed'
        }, {
          text: [
            `Поменять боковые панели местами.`,
            `Карточка пользователя.`
          ],
          label: 'optimized'
        }]
      }, {
        version: '1.4.3',
        date: '2021-12-17',
        items: [{
          text: [
            `Поменять боковые панели местами.`
          ],
          label: 'added'
        }, {
          text: [
            `Чат слева.`
          ],
          label: 'removed'
        }]
      }, {
        version: '1.4.2',
        date: '2021-12-01',
        items: [{
          text: [
            `Скрыть кнопку "НАЧАТЬ СТРИМ" в заголовке.`,
            `Скрыть кнопку "Великий рандом!" в заголовке.`
          ],
          label: 'fixed'
        }, {
          text: [
            `Показать промо-значки.`,
            `Скрыть промо сообщения.`,
            `Лимит символов ссылки.`,
            `Карточка пользователя - Упоминание.`,
            `Карточка пользователя - Дата отслеживаня.`
          ],
          label: 'added'
        }, {
          text: [
            `Исправить ссылки в чате.`,
          ],
          label: 'changed'
        }, {
          text: [
            `Инициализация чата.`,
            `Меню смайликов.`,
            `Аптайм.`,
            `Меню смайликов.`,
            `Авто-воспроизведение предложенных стримеров на главной странице.`
          ],
          label: 'optimized'
        }]
      }, {
        version: '1.4.1',
        date: '2021-11-16',
        items: [{
          text: [
            `Лимит истории пользователей.`,
            `Показать значки создателя.`,
            `Показать значки модератора.`,
            `Показать значки подписчика.`,
            `Показать значки администратора.`
          ],
          label: 'added'
        }]
      }, {
        version: '1.4.0',
        date: '2021-11-07',
        items: [{
          text: [
            `Ник пользователя в действиях это упоминание.`
          ],
          label: 'fixed'
        }, {
          text: [
            `Карточка пользователя - Значки.`
          ],
          label: 'added'
        }, {
          text: [
            `WebSocket.`,
            `Распознавание ссылок.`
          ],
          label: 'optimized'
        }]
      },{
        version: '1.3.9',
        date: '2021-10-24',
        items: [{
          text: [
            `Закрытая трансляция - Карточка пользователя - Последние сообщения.`,
            `Карточка пользователя - Добавить в избранное.`,
            `Выделять сообщения пользователей с открытыми карточками.`,
            `Отображать строки с меняющимися цветами фона.`
          ],
          label: 'fixed'
        }, {
          text: [
            `WebSocket.`,
            `Чат для OBS - Фильтрация.`
          ],
          label: 'added'
        }, {
          text: [
            `WebSocket.`,
            `BetterWASD значки.`,
            `7TV приоритет.`,
            `Карточка пользователя - Переименовать пользователя.`
          ],
          label: 'optimized'
        }]
      }, {
        version: '1.3.8',
        date: '2021-10-21',
        items: [{
          text: [
            `WebSocket.`
          ],
          label: 'added'
        }, {
          text: [
            `Карточка пользователя.`,
            `Упоминания пользователей в чата с их цветом никнейма.`
          ],
          label: 'optimized'
        }]
      }, {
        version: '1.3.7',
        date: '2021-10-18',
        items: [{
          text: [
            `Чат для OBS - Показать значки...`,
            `Чат для OBS - Стиль ссылки.`,
            `BetterWASD значки.`
          ],
          label: 'added'
        }, {
          text: [
            `Карточка пользователя.`,
            `Упоминания пользователей в чата с их цветом никнейма.`
          ],
          label: 'optimized'
        }]
      }, {
        version: '1.3.6',
        date: '2021-10-15',
        items: [{
          text: [
            `Карточка пользователя - Последние сообщения.`,
            `Карточка пользователя - Стикеры канала.`
          ],
          label: 'fixed'
        }, {
          text: [
            `Чат для OBS - Стиль удаленных сообщений.`,
            `Чат для OBS - Искусственная задержка чата.`
          ],
          label: 'added'
        }]
      },{
        version: '1.3.5',
        date: '2021-10-11',
        items: [{
          text: [
            `Настройки в новом окне.`,
            `Чат для OBS.`
          ],
          label: 'added'
        }, {
          text: [
            `Формат отметок времени для последние сообщения.`,
            `Нажмите клавишу...`
          ],
          label: 'optimized'
        }]
      },{
        version: '1.3.4',
        date: '2021-09-30',
        items: [{
          text: [
            `Выделение - Роль пользователя - Цвет для администратора WASD.`,
            `Подсказка для эмоций BTTV, FFZ и 7TV при наведении.`
          ],
          label: 'added'
        }, {
          text: [
            `Выделение - Роль пользователя.`,
            `Бэкап и восстановление.`,
            `Карточка пользователя.`,
            `Карточка пользователя - Последние сообщения.`
          ],
          label: 'optimized'
        }]
      }, {
        version: '1.3.3',
        date: '2021-09-26',
        items: [{
          text: [
            `СТРИМИНГОВАЯ - Карточка пользователя - Последние сообщения.`
          ],
          label: 'fixed'
        }, {
          text: [
            `Выделение - Роль пользователя.`,
            `Анимированные эмоции.`
          ],
          label: 'added'
        }, {
          text: [
            `Распознавание ссылок.`
          ],
          label: 'optimized'
        }]
      }, {
        version: '1.3.2',
        date: '2021-09-24',
        items: [{
          text: [
            `Карточка пользователя - Действия модерации.`,
            `Фильтрация.`,
            `PUSH уведомление при упоминании.`
          ],
          label: 'added'
        }, {
          text: [
            `Карточка пользователя - Ссылки на соц сети.`,
            `Отображение стикеров WASD.`,
            `Отображение стикеров BTTV, FFZ и 7TV.`,
            `Выделять сообщения, упоминающие вас.`
          ],
          label: 'optimized'
        }]
      }, {
        version: '1.3.1',
        date: '2021-09-16',
        items: [{
          text: [
            `Сообщение - Контекстное меню - Добавить в ЧС.`,
            `Меню модератора.`
          ],
          label: 'fixed'
        }, {
          text: [
            `Исправить символы ломающие чат (Текст Zalgo).`,
            `Заменить надпись 'в эфире' на аптайм трансляции.`,
            `Чат после проигрывателя (Мобильные устройства).`,
            `Cкрыть полосу подарков (справа и снизу).`,
            `Cкрыть рейд.`
          ],
          label: 'added'
        }, {
          text: [
            `Интерфейс.`
          ],
          label: 'optimized'
        }, {
          text: [
            `Cкрыть полосу подарков (справа).`,
            `Поддержка настроек прошлых версий > 1.2.`,
            `WebSocket для чата.`,
            `Меню модератора - YouTube.`
          ],
          label: 'removed'
        }]
      }, {
        version: '1.3.0',
        date: '2021-07-28',
        items: [{
          text: [
            `СТРИМИНГОВАЯ - Карточка пользователя - Последние сообщения.`
          ],
          label: 'fixed'
        }, {
          text: [
            `<a target="_blank" href="https://7tv.app/">7TV</a> эмоции.`,
            `Поддержка Firefox.`,
            `Чат после проигрывателя (Мобильные устройства).`,
            `Цвет для опции "Меню модератора".`
          ],
          label: 'added'
        }, {
          text: [
            `Карточка пользователя - Последние сообщения.`,
            `Распознавание ссылок`,
            `ЧС.`
          ],
          label: 'optimized'
        }]
      }, {
        version: '1.2.9',
        date: '2021-07-19',
        items: [{
          text: [
            `Меню модератора - Временно заблокировать.`,
            `Срок блока "Временно заблокировать" (Меню модератора).`,
            `Удалить все сообщения "Временно заблокировать" (Меню модератора).`,
          ],
          label: 'added'
        }, {
          text: [
            `ЧС.`,
            `Меню модератора - Забанить пользователя.`,
          ],
          label: 'changed'
        }]
      }, {
        version: '1.2.8',
        date: '2021-07-15',
        items: [{
          text: [
            `Распознавание ссылок.`,
            `Карточка пользователя - Последние сообщения.`,
            `BTTV и FFZ`
          ],
          label: 'optimized'
        }]
      }, {
        version: '1.2.7',
        date: '2021-07-13',
        items: [{
          text: [
            `Скрыть кнопку "Великий рандом!" в заголовке.`
          ],
          label: 'added'
        }, {
          text: [
            `Ошибка инициализации чата при нажатии на Великий рандом!.`
          ],
          label: 'fixed'
        }, {
          text: [
            `<a href="https://chrome.google.com/webstore/detail/fdgepfaignbakmmbiafocfjcnaejgldb" target="_blank">БОТ</a>.`
          ],
          label: 'removed'
        }]
      }, {
        version: '1.2.6',
        date: '2021-07-11',
        items: [{
          text: [
            'Ник пользователя в действиях это упоминание.'
          ],
          label: 'optimized'
        }, {
          text: [
            `Карточка пользователя - Последние сообщения - Роли пользователя.`
          ],
          label: 'added'
        }, {
          text: [
            `Карточка пользователя - Последние сообщения - APNG.`,
            `Принудительно изменять размер стикеров.`,
            `Прокрутка чата.`
          ],
          label: 'fixed'
        }]
      }, {
        version: '1.2.5.2',
        date: '2021-07-06',
        items: [{
          text: [
            'FFZ.'
          ],
          label: 'optimized'
        }]
      }, {
        version: '1.2.5.1',
        date: '2021-07-06',
        items: [{
          text: [
            'Инициализация FFZ.'
          ],
          label: 'fixed'
        }]
      }, {
        version: '1.2.5',
        date: '2021-07-06',
        items: [{
          text: [
            `Разделение BTTV и FFZ эмоций по вкладкам.`,
            `Удалить эмоции пользователя BTTV и FFZ.`,
            `Обновить эмоции пользователя BTTV и FFZ.`
          ],
          label: 'added'
        }, {
          text: [
            'Скрыть кнопку похвалить канал.',
            'Опция BTTV и FFZ в меню смайликов в чате.',
            'Чат в мобильной версии.',
            'Карточка пользователя - Стикеры канала - APNG.'
          ],
          label: 'optimized'
        }]
      }, {
        version: '1.2.4',
        date: '2021-07-04',
        items: [{
          text: [
            `Чат команды пользователя (Префикс в настройках BOT) (title, game).`,
            `<a target="_blank" href="https://www.frankerfacez.com/">FFZ</a> эмоции.`
          ],
          label: 'added'
        }, {
          text: [
            'БОТ.',
            'Инициализация.',
          ],
          label: 'optimized'
        }]
      }, {
        version: '1.2.3',
        date: '2021-07-02',
        items: [{
          text: [
            `Значение по умолчанию.`
          ],
          label: 'added'
        }, {
          text: [
            'Создавать клипы в проигрывателе а не новом окне.',
            'Искусственная задержка чата.',
            `Черный список.`
          ],
          label: 'optimized'
        }, {
          text: [
            'Распознавание упоминаний.',
            'Аптайм трансляции.'
          ],
          label: 'fixed'
        }]
      }, {
        version: '1.2.2',
        date: '2021-06-29',
        items: [{
          text: [
            `Карточка пользователя - Последние сообщения.`,
            `Создавать клип в проигрывателе а не новом окне.`
          ],
          label: 'optimized'
        }, {
          text: [
            'Инициализация private-стримы.',
            'Stream-settings - Карточка пользователя.',
            `Нажмите клавишу '...' чтобы ...`
          ],
          label: 'fixed'
        }]
      }, {
        version: '1.2.1',
        date: '2021-06-26',
        items: [{
          text: [
            `Карточка пользователя - Стикеры канала.`,
            `Создавать клипы в проигрывателе а не новом окне.`
          ],
          label: 'optimized'
        }, {
          text: [
            'Цвет ссылки.'
          ],
          label: 'changed'
        }, {
          text: [
            'Искусственная задержка чата.',
            'Чат команды пользователя (Префикс в настройках BOT) (user).',
            'Чат команды (Префикс в настройках BOT) (followers, followersoff, subscribers, subscribersoff).'
          ],
          label: 'added'
        }]
      }, {
        version: '1.2.0.2',
        date: '2021-06-22',
        items: [{
          text: [
            `Карточка пользователя - Перемещение.`,
            `Чат команды.`
          ],
          label: 'optimized'
        }, {
          text: [
            'Создавать клипы в проигрывателе а не новом окне.'
          ],
          label: 'added'
        }]
      }, {
        version: '1.2.0.1',
        date: '2021-06-22',
        items: [{
          text: [
            'Канал (скрыть) - Симпа - Всплывающая подсказка.'
          ],
          label: 'optimized'
        }]
      }, {
        version: '1.2.0',
        date: '2021-06-22',
        items: [{
          text: [
            `Карточка пользователя - Последние сообщения - Упоминания.`,
            `Скрыть кнопку "НАЧАТЬ СТРИМ" в заголовке.`,
            `Скрыть баннер на главной странице.`,
            `Заглушить или включить звук проигрывателя путём щелчка по средней кнопке мыши.`,
            `Размер стикеров BTTV.`,
            `Отображение стикеров BTTV.`,
            `Меню модератора - Twicth.`,
            `Поиск эмоций в меню смайликов - BTTV.`,
            `Формат отметок времени.`,
            `Выделять сообщения, упоминающие вас.`,
            `Цвет сообщения, упоминающие вас.`,
            `Всегда раскрывать регулятор громкости.`,
            `Выделять сообщения пользователей с открытыми карточками.`,
            `Цвет выделения сообщения пользователя с открытой карточкой.`
          ],
          label: 'added'
        }, {
          text: [
            `Карточка пользователя - Перемещение.`,
            `Чат команды.`
          ],
          label: 'optimized'
        }, {
          text: [
            `Карточка пользователя  - Последние сообщения - Размер шрифта.`,
            `Распознавание ссылок - Прокрутка.`,
            `Меню модератора - ALT - Ссылка.`,
            `Заполнение сообщений чата.`
          ],
          label: 'fixed'
        }, {
          text: [
            `Инициализация чата во время рейда.`,
            `Меню модератора.`
          ],
          label: 'changed'
        }]
      }, {
        version: '1.1.9',
        date: '2021-06-18',
        items: [{
          text: [
            `Чат команды (Префикс в настройках BOT) (title, game, uptime).`
          ],
          label: 'added'
        }, {
          text: [
            `Карточка пользователя.`,
            `Чат команды.`,
            `Распознавание ссылок.`
          ],
          label: 'optimized'
        }, {
          text: [
            `Аптайм трансляции.`
          ],
          label: 'changed'
        }]
      }, {
        version: '1.1.8',
        date: '2021-06-16',
        items: [{
          text: [
            `Чат команды (Префикс в настройках BOT) (ban, unban, mod, unmod, raid) (username).`
          ],
          label: 'added'
        }, {
          text: [
            `Ошибка инициализации чата при нажатии на StreamSettings.`
          ],
          label: 'fixed'
        }, {
          text: [
            'WebSocket для чата.'
          ],
          label: 'optimized'
        }]
      }, {
        version: '1.1.7',
        date: '2021-06-15',
        items: [{
          text: [
            'WebSocket для чата.'
          ],
          label: 'added'
        }, {
          text: [
            'Основные ошибки инициализации чата.'
          ],
          label: 'fixed'
        }, {
          text: [
            'Неавторизованные пользователи.',
            'Мобильные устройства.'
          ],
          label: 'optimized'
        }]
      }, {
        version: '1.1.6',
        date: '2021-06-08',
        items: [{
          text: [
            'Мобильные устройства.',
            'Чат в новом окне.'
          ],
          label: 'optimized'
        }]
      }, {
        version: '1.1.5',
        date: '2021-06-06',
        items: [{
          text: ['Черный список.'],
          label: 'added'
        }, {
          text: ['Размер шрифта в пикселях.'],
          label: 'optimized'
        }]
      }, {
        version: '1.1.4',
        date: '2021-06-04',
        items: [{
          text: [
            'Действие при клике на пользователя или упоминание пользователя при зажатой клавише.'
          ],
          label: 'added'
        }, {
          text: [
            'Театральный режим - Карточка пользователя - Последние сообщения.'
          ],
          label: 'fixed'
        }, {
          text: [
            'Меню смайликов - BTTV.',
            'Распознавание ссылок.'
          ],
          label: 'optimized'
        }]
      }, {
        version: '1.1.3',
        date: '2021-06-03',
        items: [{
          text: [
            'Карточка пользователя - Изменить ник.'
          ],
          label: 'added'
        }, {
          text: [
            'Карточка пользователя.', 'BTTV.',
            'Карточка пользователя - Последние сообщения - Стикеры.'
          ],
          label: 'optimized'
        }]
      }, {
        version: '1.1.2',
        date: '2021-06-01',
        items: [{
          text: [
            'Карточка пользователя - Последние сообщения.'
          ],
          label: 'added'
        }]
      }, {
        version: '1.1.1',
        date: '2021-05-29',
        items: [{
          text: [
            'Скрыть оверлей над проигрывателем.',
            'Скрыть сообщение о новом подписчике.',
            'Поиск эмоций.'
          ],
          label: 'added'
        }, {
          text: [
            'Скрыть системные сообщения.',
            'Распознаватель ссылок.'
          ],
          label: 'optimized'
        }, {
          text: [
            'Карточка пользователя - Перетаскивание.'
          ],
          label: 'fixed'
        }]
      }, {
        version: '1.1.0',
        date: '2021-05-24',
        items: [{
          text: [
            'Распознаватель ссылок. <a target="_blank" href="https://github.com/FrankerFaceZ/link-service">link-service</a>',
            'Карточка пользователя - Ссылки на соц сети.',
            'Разрешение смайликов в чате.'
          ],
          label: 'added'
        }, {
          text: [
            'BTTV.'
          ],
          label: 'optimized'
        }, {
          text: [
            'Карточка пользователя - Стикеры канала.'
          ],
          label: 'fixed'
        }]
      }, {
        version: '1.0.9',
        date: '2021-05-23',
        items: [{
          text: [
            '<a target="_blank" href="https://betterttv.com/">BTTV</a> эмоции.',
            'Бэкап и восстановление.'
          ],
          label: 'added'
        }]
      }, {
        version: '1.0.8.1',
        date: '2021-05-21',
        items: [{
          text: [
            'Аптайм трансляции.'
          ],
          label: 'added'
        }]
      }, {
        version: '1.0.8',
        date: '2021-05-20',
        items: [{
          text: [
            'Отображение стикеров - Минимизировать (увеличить при наведении).'
          ],
          label: 'added'
        }, {
          text: [
            'Цвет пользователя при упоминании.',
            'Темная тема.',
            'Карточка пользователя.'
          ],
          label: 'optimized'
        }]
      }, {
        version: '1.0.7',
        date: '2021-05-19',
        items: [{
          text: [
            'Исправить ссылки в чате.',
            'Карточка пользователя - Действие при клике на упоминание пользователя.',
            'BetterWASD кнопка в меню дополнительные опции.'
          ],
          label: 'added'
        }, {
          text: [
            'Ссылка.',
            'BetterWASD кнопка в настройках чата.'
          ],
          label: 'optimized'
        }, {
          text: [
            'Ссылка.',
            'При клике на упоминание добавить в текстовое поле.',
            'Упоминания пользователей в чата с их цветом никнейма.',
            'Выделять упоминания в чате жирным шрифтом.'
          ],
          label: 'fixed'
        }]
      }, {
        version: '1.0.6',
        date: '2021-05-15',
        items: [{
          text: [
            'Чередование цвета сообщений в чате.',
            'Панель поиска.'
          ],
          label: 'added'
        }, {
          text: [
            'Alt меню модератора.'
          ],
          label: 'changed'
        }]
      }, {
        version: '1.0.5',
        date: '2021-05-13',
        items: [{
          text: [
            "Нажмите клавишу 'x' чтобы создать 'Клип'.",
            "Нажмите клавишу 'i' чтобы переключить режми 'Картинка в картинке'.",
            "Нажмите клавишу 't' чтобы переключить 'Театральный режим'.",
            "Нажмите клавишу 'f' чтобы переключить режми 'На весь экран'.",
            'Отключить Авто-воспроизведение предложенных стримеров на главной странице.',
            'Alt меню модератора.',
            'Сбросить проигрыватель.',
            'Новый режим Картинка в картинке.'
          ],
          label: 'added'
        }, {
          text: [
            'При клике на упоминание добавить в текстовое поле.'
          ],
          label: 'optimized'
        }, {
          text: [
            'F5.',
            'Отображение стикера.'
          ],
          label: 'fixed'
        }, {
          text: [
            'Маленькие значки.'
          ],
          label: 'removed'
        }]
      }, {
        version: '1.0.4',
        date: '2021-05-09',
        items: [{
          text: [
            'Скрыть верхнюю панель (испытание).',
            'Скрыть верхнюю панель (пожертвовать).',
            'Изменить размер шрифта.',
            'Скрыть сообщение стримеру.',
            'Скрыть подарочные кнопки.',
            'Выделять упоминания в чате жирным шрифтом.',
            'Скрыть удивительную кнопку пожертвования.',
            'Скрыть кнопку канала пожертвований.',
            'Размер (ширина) чата в пикселях.',
            'Чат слева.'
          ],
          label: 'added'
        }]
      }, {
        version: '1.0.3',
        date: '2021-05-07',
        items: [{
          text: [
            'F5.'
          ],
          label: 'optimized'
        }]
      }, {
        version: '1.0.2',
        date: '2021-05-06',
        items: [{
            text: [
              'Цвет при упоминании.',
              'Изменить цвет ссылки.',
              'Добавить имя пользователя в текстовое поле при нажатии на упоминание.'
            ],
            label: 'added'
          },
          {
            text: [
              'Отображение стикера.'
            ],
            label: 'optimized'
          }
        ]
      }, {
        version: '1.0.1',
        date: '2021-05-04',
        items: [{
          text: [
            'Использовать небольшой значок.',
            'Добавлять двоеточие после ника.',
            'Изменять заполнение сообщений чата.',
            'Изменить отображение стикера.'
          ],
          label: 'added'
        }]
      }, {
        version: '1.0.0',
        date: '2021-05-03',
        items: [{
          text: [
            'Первый выпуск'
          ],
          label: 'added'
        }]
      }
    ];

    let changelogHtml = '';
    for (let changelog of changelogList.slice(0, 5)) {
      changelogHtml += `<h2 style="color: var(--wasd-color-text-prime);">Version ${changelog.version} (${changelog.date})</h2><ul style="display: grid;padding-inline-start: 4px;margin: 5px 0;">`;

      for (let item of changelog.items) {
        if (item.label) {
          let labelHtml = '';
          let labels = item.label.split(' ');
          for (let label of labels) {
            changelogHtml += changelogLabels[label];
          }

          for (let text of item.text) {
            changelogHtml += `<span class="textlabel">• ${text}</span>`;
          }
        }
        if (item.issueID) {
          item.text += ` (<a target="_blank" href="https://github.com/ovgamesdev/BetterWASD.tv/issues/${item.issueID}">#${item.issueID}</a>)`;
        }
      }
      changelogHtml += '</ul>';
    }

    let settingsDiv = document.createElement('div');
    this.settingsDiv = settingsDiv;
    settingsDiv.style.display = 'none';
    settingsDiv.id = 'bscSettingsPanel';
    settingsDiv.innerHTML = `
      <div id="status">
        <p>
        </p>
      </div>
      <header>

        <div class="header__left-side">
          <div ovg="" class="burger-menu__wrap mobile" style="width: 1.6rem;padding-left: 6px;"><div ovg="" class="burger-toggle show-section-mobile"><div ovg="" class="burger-toggle__icon icon-default"><i ovg="" class="wasd-icons-menu-burger"></i></div><div ovg="" class="burger-toggle__icon icon-active"><i ovg="" class="wasd-icons-close"></i></div></div></div>

          <div ovg="" class="header-new__nav-sidebar-toggle nav-sidebar-toggle open-nav-sidebar">
            <i ovg="" class="wasd-icons-sidebar-burgermenu-closed nav-sidebar-toggle__icon-default"></i>
            <i ovg="" class="wasd-icons-sidebar-burgermenu-opened nav-sidebar-toggle__icon-active"></i>
          </div>

          <a class="logo">
            <img alt="BetterWASD.TV" src="">
            <div class="logo__mob" tabindex="0"></div>
          </a>

          <wasd-input class="ng-valid ng-dirty ng-touched notfocused" id="settingsSearchDiv">
            <div ovg="" class="wasd-input-wrapper">
              <div ovg="" class="wasd-input">
                <input ovg="" id="settingsSearch" class="has-button ng-pristine ng-untouched ng-valid ui-autocomplete-input" placeholder="Поиск настроек" type="text" autocomplete="off" style="margin: 0;">
                <button ovg="" type="button" class="button-icon">
                  <i ovg="" class="wasd-icons-search"></i>
                </button>
              </div>
            </div>
          </wasd-input>

          <div class="header__search-btn" tabindex="0" style="display: none">
            <i class="wasd-icons-search"></i>
          </div>

        </div>

        <div class="header__right-side">
          <wasd-button class="ghost-btn ovg head-buttons" style="margin-right: 8px;">

            <button class="basic medium-cube ovg twitch_authorize_public" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" focusable="false" width="14px" height="14px" fit="" viewBox="0 0 1600 1664"><path d="M800 434v434H655V434h145zm398 0v434h-145V434h145zm0 760l253-254V145H257v1049h326v217l217-217h398zM1596 0v1013l-434 434H836l-217 217H402v-217H4V289L113 0h1483z" fill="currentColor"></path></svg>
              <ovg-tooltip><div class="tooltip tooltip_position-bottomRight tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left"> Авторизоваться Twicth </div></div></ovg-tooltip>
            </button>

            <ovg-bell _ngcontent-ljm-c266="" id="ovg_bell__element" _nghost-ljm-c288="">
              <div _ngcontent-ljm-c288="" wasdclickoutside="" class="bell">
                <button _ngcontent-ljm-c288="" class="bell__icon-wrap bell_button basic medium-cube ovg">
                  <i _ngcontent-ljm-c288="" class="bell__icon wasd-icons-bell bell__icon--animation">
                    <svg _ngcontent-ljm-c288="" viewBox="0 0 12 14" xmlns="http://www.w3.org/2000/svg" class="bell__icon-background" style="display: none;"><path _ngcontent-ljm-c288="" fill-rule="evenodd" clip-rule="evenodd" d="M4.83952 1.50457C4.83364 1.48211 4.82838 1.45935 4.82375 1.4363C4.69316 0.786707 5.11402 0.15427 5.76363 0.0237462C6.41323 -0.10679 7.04571 0.313967 7.17628 0.963696C7.21244 1.1438 7.20623 1.32259 7.16453 1.48973C9.0087 2.00916 10.3587 3.76186 10.3587 5.83425V7.29605C10.3587 7.89446 10.6116 8.45966 11.045 8.8377L11.297 9.05753C11.7439 9.44743 12 10.0197 12 10.6206V10.6343C12 11.7502 11.1241 12.6666 10.0281 12.6666H7.88621C7.61167 13.4435 6.87085 14 6 14C5.12914 14 4.38833 13.4435 4.11379 12.6666H1.9719C0.875916 12.6666 0 11.7501 0 10.6343C0 10.0219 0.266038 9.43977 0.72786 9.05002L0.986731 8.83149C1.43413 8.45393 1.69677 7.87929 1.69677 7.26951V5.83425C1.69677 3.78116 3.02171 2.04185 4.83952 1.50457Z" fill="#141820"></path></svg>
                  </i>
                  <ovg-tooltip><div class="tooltip tooltip_position-bottomRight tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left"> Уведомления </div></div></ovg-tooltip>
                </button>
                <div _ngcontent-ljm-c288="" class="bell__info bell-info" hidden="" style="z-index: 5;">
                  <div _ngcontent-ljm-c288="" class="bell-info__title"> Уведомления </div>
                  <div _ngcontent-ljm-c288="" class="bell-info__hr"></div>
                  <div _ngcontent-ljm-c288="" class="bell-info__list bell-info__list--scroll">
                  </div>
                </div>
              </div>
            </ovg-bell>

            <button class="basic medium-cube ovg updateemotes" type="button">
              <i class="wasd-icons-record"></i>
              <ovg-tooltip><div class="tooltip tooltip_position-bottomRight tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left"> Обновить эмоции (нажмите дважды) </div></div></ovg-tooltip>
            </button>
            <button class="basic medium-cube ovg update" type="button">
              <i class="wasd-icons-record"></i>
              <ovg-tooltip><div class="tooltip tooltip_position-bottomRight tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left"> Обновить чат (нажмите дважды) </div></div></ovg-tooltip>
            </button>
            <button class="basic medium-cube ovg hide-fullscreen newtab" type="button">
              <i class="ovg wasd-icons-extract"></i>
              <ovg-tooltip><div class="tooltip tooltip_position-bottomRight tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left"> Открыть настройки в новом окне </div></div></ovg-tooltip>
            </button>
            <button class="basic medium-cube ovg hide-fullscreen close" type="button">
              <i class="ovg wasd-icons-close"></i>
            </button>
          </wasd-button>
        </div>

      </header>

      <section class="ovg-tabs-wrapper vertical left" style="display:none">
        <div class="tabs">
          <div class="items" style="padding: 10px 0">
            <a role="tab" class="item" data-tab="about">О нас</a>
            <a role="tab" class="item" data-tab="general">Общий</a>
            <a role="tab" class="item active" data-tab="wasdSettings">Настройки</a>
            <a role="tab" class="item" data-tab="bwasdSettings">BetterWASD</a>
            <a role="tab" class="item" data-tab="tv7Settings">7TV</a>
            <a role="tab" class="item" data-tab="bttvSettings">BTTV</a>
            <a role="tab" class="item" data-tab="ffzSettings">FFZ</a>
            <a role="tab" class="item" data-tab="filtration">Фильтрация</a>
            <a role="tab" class="item" data-tab="obschat">Чат для OBS (beta)</a>
            <a role="tab" class="item" data-tab="changelog">Журнал изменений</a>
          </div>
        </div>
      </section>

      <wasd-nav-sidebar ovg="" style="z-index:5">
        <div ovg="" id="nav-sidebar" class="nav-sidebar" style="height: calc(100% - 48px);z-index: 1;float: left;z-index: 5557;overflow: hidden;">
          <ul ovg="" class="nav-sidebar__list top" style="position: fixed;top: auto;animation-duration: .5s;">
            <li ovg="">
              <a ovg="" class="nav-sidebar__item" data-tab="general" style="position: relative;">
                <i ovg="" class="wasd-icons-settings"></i>
                <span ovg="">Общий</span>
                <ovg-tooltip>
                  <div class="tooltip tooltip_position-right tooltip_size-small" style="width: 260px;">
                    <div class="tooltip-content tooltip-content_left"> Общий </div>
                  </div>
                </ovg-tooltip>
              </a>
            </li>
            <li ovg="">
              <a ovg="" class="nav-sidebar__item nav-sidebar__item--active" data-tab="wasdSettings" style="position: relative;">
                <i ovg="" class="wasd-icons-settings-profile"></i>
                <span ovg="">Настройки</span>
                <ovg-tooltip>
                  <div class="tooltip tooltip_position-right tooltip_size-small" style="width: 260px;">
                    <div class="tooltip-content tooltip-content_left"> Настройки </div>
                  </div>
                </ovg-tooltip>
              </a>
            </li>
            <li ovg="">
              <a ovg="" class="nav-sidebar__item" data-tab="bwasdSettings" style="position: relative;">
                <i ovg="" class="ovg-icon-bwasd" style="font-size: 24px;"></i>
                <span ovg="">BetterWASD</span>
                <ovg-tooltip>
                  <div class="tooltip tooltip_position-right tooltip_size-small" style="width: 260px;">
                    <div class="tooltip-content tooltip-content_left"> BetterWASD </div>
                  </div>
                </ovg-tooltip>
              </a>
            </li>
            <li ovg="">
              <a ovg="" class="nav-sidebar__item" data-tab="tv7Settings" style="position: relative;">
                <i ovg="" class="ovg-icon-tv7"></i>
                <span ovg="">7TV</span>
                <ovg-tooltip>
                  <div class="tooltip tooltip_position-right tooltip_size-small" style="width: 260px;">
                    <div class="tooltip-content tooltip-content_left"> 7TV </div>
                  </div>
                </ovg-tooltip>
              </a>
            </li>
            <li ovg="">
              <a ovg="" class="nav-sidebar__item" data-tab="bttvSettings" style="position: relative;">
                <i ovg="" class="ovg-icon-bttv" style="font-size: 24px;"></i>
                <span ovg="">BetterTTV</span>
                <ovg-tooltip>
                  <div class="tooltip tooltip_position-right tooltip_size-small" style="width: 260px;">
                    <div class="tooltip-content tooltip-content_left"> BetterTTV </div>
                  </div>
                </ovg-tooltip>
              </a>
            </li>
            <li ovg="">
              <a ovg="" class="nav-sidebar__item" data-tab="ffzSettings" style="position: relative;">
                <i ovg="" class="ovg-icon-ffz"></i>
                <span ovg="">FrankerFaceZ</span>
                <ovg-tooltip>
                  <div class="tooltip tooltip_position-right tooltip_size-small" style="width: 260px;">
                    <div class="tooltip-content tooltip-content_left"> FrankerFaceZ </div>
                  </div>
                </ovg-tooltip>
              </a>
            </li>
            <li ovg="">
              <a ovg="" class="nav-sidebar__item" data-tab="filtration" style="position: relative;">
                <i ovg="" class="ovg-icon-filter" style="font-size: 18px;"></i>
                <span ovg="">Фильтрация</span>
                <ovg-tooltip>
                  <div class="tooltip tooltip_position-right tooltip_size-small" style="width: 260px;">
                    <div class="tooltip-content tooltip-content_left"> Фильтрация </div>
                  </div>
                </ovg-tooltip>
              </a>
            </li>
            <li ovg="">
              <a ovg="" class="nav-sidebar__link" style="position: relative;" id="goToObsChatSetting">
                <i ovg="" class="ovg-icon-chat"></i>
                <span ovg="">Чат для OBS (beta) <i class="icon wasd-icons-extract" style="padding-left: 5px;"></i></span>
                <ovg-tooltip>
                  <div class="tooltip tooltip_position-right tooltip_size-small" style="width: 260px;">
                    <div class="tooltip-content tooltip-content_left"> Чат для OBS (beta) <i class="icon wasd-icons-extract" style="padding-left: 5px;"></i> </div>
                  </div>
                </ovg-tooltip>
              </a>
            </li>
            <li ovg="">
              <a ovg="" class="nav-sidebar__item" data-tab="changelog" style="position: relative;">
                <i ovg="" class="ovg-icon-history"></i>
                <span ovg="">Журнал изменений</span>
                <ovg-tooltip>
                  <div class="tooltip tooltip_position-right tooltip_size-small" style="width: 260px;">
                    <div class="tooltip-content tooltip-content_left"> Журнал изменений </div>
                  </div>
                </ovg-tooltip>
              </a>
            </li>
          </ul>
          <ul ovg="" class="nav-sidebar__list bottom" style="bottom: 40px;">
            <li ovg="" style="position: fixed;">
              <a ovg="" class="nav-sidebar__item" data-tab="about" style="position: relative;">
                <i ovg="" class="wasd-icons-sidebar-faq"></i>
                <span ovg="">О нас</span>
                <ovg-tooltip>
                  <div class="tooltip tooltip_position-right tooltip_size-small" style="width: 260px;">
                    <div class="tooltip-content tooltip-content_left"> О нас </div>
                  </div>
                </ovg-tooltip>
              </a>
            </li>
          </ul>
        </div>
      </wasd-nav-sidebar>

      <main class="text pod-position" data-tab="about">

        <div style="padding: 10px;">
          <span style="font-size: 21px;">Напишите отзыв на <a target="_blank" href="https://chrome.google.com/webstore/detail/betterwasd/cokaeiijnnpcfaoehijmdfcgbkpffgbh">Chrome Webstore</a> или скачайте БОТа для вашего WASD канала <a target="_blank" href="https://chrome.google.com/webstore/detail/fdgepfaignbakmmbiafocfjcnaejgldb/">Chrome Webstore</a></span>
        </div>

        <div style="padding: 10px;">
          <span>Автор: <a href="https://ovgamesdev.github.io/" target="_blank">OvGames</a> | <a href="https://wasd.tv/ovgames" target="_blank">WASD</a></span>
        </div>

        <div style="padding: 10px;">
          <h2 style="padding-bottom: 10px;">Настройки</h2>
          <div class="flat-btn ovg ovg-button-div" style="margin: 0!important;display: inline-grid;">
            <button style="margin-bottom: 6px;" class="primary medium ovg backup-download">
              <span class="ovg-button-span">
                <i class="ovg-icon-download" style="font-size: 20px;"></i>
              </span>
              <span> Cкачать резервную копию </span>
            </button>
            <button style="margin-bottom: 6px;" class="primary medium ovg backup-upload">
              <span class="ovg-button-span">
                <i class="ovg-icon-upload" style="font-size: 20px;"></i>
              </span>
              <span> Импортировать настройки </span>
            </button>
            <button style="" class="backup-reset medium ovg warning">
              <span class="ovg-button-span">
                <i class="wasd-icons-record" style="font-size: 20px;"></i>
              </span>
              <span class=""> Сбросить по умолчанию </span>
              <ovg-tooltip><div class="tooltip tooltip_position-bottomRight tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left"> нажмите дважды </div></div></ovg-tooltip>
            </button>
          </div>
        </div>

        <input id="importInput" type="file" accept=".backup, .backup.txt" style="display: none;">
        <div id="backupDropContainer" class="drodHere">Drop Here</div>

        <div class="bottom footer">
          <span>Version ${changelogList[0].version} (${changelogList[0].date})</span>
          <div class="right tooltip-hover" style="position: relative;">
            <div class="active-tech-status-ovg"></div>
            <span class="activeUsers tech-info-ovg">0</span>
            <ovg-tooltip><div class="tooltip tooltip_position-topRight tooltip_size-small" style="width: 260px;right: -4px;"><div class="tooltip-content tooltip-content_left"> Активных пользователей </div></div></ovg-tooltip>
            
            <!--div><span class="activeChannelUsers">0</span><span> пользователей просматривающие канал </span><span  class="activeChannel"></span></div-->
          </div>
        </div>

      </main>
      <main id="general" data-tab="general">
        ${HelperSettings.build('general')}
      </main>

      <main class="text" data-tab="bwasdSettings">
        <h1 style="padding-left: 10px; padding-right: 10px;"> BetterWASD </h1>
        <!--div>
            
          <wasd-input _ngcontent-gmb-c228="" _ngcontent-gmb-c28="" class="ng-valid ng-dirty ng-touched">
            <div ovg="" class="wasd-input-wrapper"><div ovg="" class="wasd-input">
              <label ovg=""></label>
              <input id="wasdAddUser" ovg="" class="has-button ng-pristine ng-untouched ng-valid" placeholder="Добавить новый канал (Twitch username)" type="text">
                <button id="wasdAddUserBtn" ovg="" type="button" class="button-icon">
                  <i ovg="" class="wasd-icons-add"></i>
                </button>
              </div>
            </div>
          </wasd-input>
        </div-->

        <h2> Доступные эмоции BetterWASD <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSfeR-ASq3bQBE6t3F5lIutvfcJkh8bUxAWqls80Q1WMNAEivQ/viewform?usp=sf_link">Предложить эмоцию</a> </h2>

        <wasd-input _ngcontent-gmb-c228="" _ngcontent-gmb-c28="" class="ng-valid ng-dirty ng-touched">
          <div ovg="" class="wasd-input-wrapper">
            <div ovg="" class="wasd-input">
              <label ovg=""></label>
              <input id="bwasdemojiSearch" ovg="" class="has-button ng-pristine ng-untouched ng-valid" placeholder="Поиск эмоций" type="text">
              <button ovg="" type="button" class="button-icon">
                <i ovg="" class="wasd-icons-close"></i>
              </button>
            </div>
          </div>
        </wasd-input>

        <ul id="bwasdEmoteList"></ul>
      </main>

      <main class="text" data-tab="bttvSettings">
        <h1 style="padding-left: 10px; padding-right: 10px;"> BetterTTV  </h1>
        <div>
            
          <wasd-input _ngcontent-gmb-c228="" _ngcontent-gmb-c28="" class="ng-valid ng-dirty ng-touched">
            <div ovg="" class="wasd-input-wrapper"><div ovg="" class="wasd-input">
              <label ovg=""></label>
              <input id="bttvAddUser" ovg="" class="has-button ng-pristine ng-untouched ng-valid" placeholder="Добавить новый канал (Twitch username)" type="text">
                <button id="bttvAddUserBtn" ovg="" type="button" class="button-icon">
                  <i ovg="" class="wasd-icons-add"></i>
                </button>
              </div>
            </div>
          </wasd-input>
        </div>

        <table class="table-ovg">
          <thead class="thead-ovg">
            <th class="table-heading-ovg">
              <div class="table-heading-text-ovg">Имя пользователя</div>
            </th>
            <th class="table-heading-ovg">
              <div class="table-heading-text-ovg">Время последнего обновления</div>
            </th>
            <th class="table-heading-ovg remove">
              <div class="table-heading-text-ovg">Действия</div>
            </th>
          </thead>
          <tbody class="bttvUserList ovg-items">
          </tbody>
        </table>
        <h2> Доступные эмоции BetterTTV </h2>

        <wasd-input _ngcontent-gmb-c228="" _ngcontent-gmb-c28="" class="ng-valid ng-dirty ng-touched">
          <div ovg="" class="wasd-input-wrapper">
            <div ovg="" class="wasd-input">
              <label ovg=""></label>
              <input id="bttvemojiSearch" ovg="" class="has-button ng-pristine ng-untouched ng-valid" placeholder="Поиск эмоций" type="text">
              <button ovg="" type="button" class="button-icon">
                <i ovg="" class="wasd-icons-close"></i>
              </button>
            </div>
          </div>
        </wasd-input>

        <ul id="bttvEmoteList"></ul>
      </main>

      <main class="text" data-tab="ffzSettings">
        <h1 style="padding-left: 10px; padding-right: 10px;"> FrankerFaceZ </h1>
        <div>

          <wasd-input _ngcontent-gmb-c228="" _ngcontent-gmb-c28="" class="ng-valid ng-dirty ng-touched">
            <div ovg="" class="wasd-input-wrapper"><div ovg="" class="wasd-input">
              <label ovg=""></label>
              <input id="ffzAddUser" ovg="" class="has-button ng-pristine ng-untouched ng-valid" placeholder="Добавить новый канал (Twitch username)" type="text">
                <button id="ffzAddUserBtn" ovg="" type="button" class="button-icon">
                  <i ovg="" class="wasd-icons-add"></i>
                </button>
              </div>
            </div>
          </wasd-input>
        </div>

        <table class="table-ovg">
          <thead class="thead-ovg">
            <th class="table-heading-ovg">
              <div class="table-heading-text-ovg">Имя пользователя</div>
            </th>
            <th class="table-heading-ovg">
              <div class="table-heading-text-ovg">Время последнего обновления</div>
            </th>
            <th class="table-heading-ovg remove">
              <div class="table-heading-text-ovg">Действия</div>
            </th>
          </thead>
          <tbody class="ffzUserList ovg-items">
          </tbody>
        </table>

        <h2> Доступные эмоции FrankerFaceZ </h2>

        <wasd-input _ngcontent-gmb-c228="" _ngcontent-gmb-c28="" class="ng-valid ng-dirty ng-touched">
          <div ovg="" class="wasd-input-wrapper"><div ovg="" class="wasd-input">
            <label ovg=""></label>
            <input id="ffzemojiSearch" ovg="" class="has-button ng-pristine ng-untouched ng-valid" placeholder="Поиск эмоций" type="text">
              <button ovg="" type="button" class="button-icon">
                <i ovg="" class="wasd-icons-close"></i>
              </button>
            </div>
          </div>
        </wasd-input>

        <ul id="ffzEmoteList"></ul>
      </main>

      <main class="text" data-tab="tv7Settings">
        <h1 style="padding-left: 10px; padding-right: 10px;"> 7TV </h1>
        <div>

          <wasd-input _ngcontent-gmb-c228="" _ngcontent-gmb-c28="" class="ng-valid ng-dirty ng-touched">
            <div ovg="" class="wasd-input-wrapper"><div ovg="" class="wasd-input">
              <label ovg=""></label>
              <input id="tv7AddUser" ovg="" class="has-button ng-pristine ng-untouched ng-valid" placeholder="Добавить новый канал (Twitch username)" type="text">
                <button id="tv7AddUserBtn" ovg="" type="button" class="button-icon">
                  <i ovg="" class="wasd-icons-add"></i>
                </button>
              </div>
            </div>
          </wasd-input>
        </div>

        <table class="table-ovg">
          <thead class="thead-ovg">
            <th class="table-heading-ovg">
              <div class="table-heading-text-ovg">Имя пользователя</div>
            </th>
            <th class="table-heading-ovg">
              <div class="table-heading-text-ovg">Время последнего обновления</div>
            </th>
            <th class="table-heading-ovg remove">
              <div class="table-heading-text-ovg">Действия</div>
            </th>
          </thead>
          <tbody class="tv7UserList ovg-items">
          </tbody>
        </table>

        <h2> Доступные эмоции 7TV </h2>

        <wasd-input _ngcontent-gmb-c228="" _ngcontent-gmb-c28="" class="ng-valid ng-dirty ng-touched">
          <div ovg="" class="wasd-input-wrapper"><div ovg="" class="wasd-input">
            <label ovg=""></label>
            <input id="tv7emojiSearch" ovg="" class="has-button ng-pristine ng-untouched ng-valid" placeholder="Поиск эмоций" type="text">
              <button ovg="" type="button" class="button-icon">
                <i ovg="" class="wasd-icons-close"></i>
              </button>
            </div>
          </div>
        </wasd-input>

        <ul id="tv7EmoteList"></ul>
      </main>

      <main class="active" data-tab="wasdSettings">
        ${HelperSettings.build('wasd')}
      </main>

      <main class="text" data-tab="changelog">
        <h1>Список последних обновлений и исправлений.</h1>
        <!--h4 style="margin-top:10px;padding-left: 10px;padding-right: 0px;margin-bottom: 0px;"> Информацию о будущих версиях можно найти <a href="https://wasd.tv/ovgames/posts">тут</a></h4-->
        ${changelogHtml}
      </main>

      <main class="" data-tab="filtration">

        <div style="display: flex;justify-content: space-between;">
          <h1 style="padding-left: 10px;padding-top: 10px;"> Фильтрация </h1>
        </div>

        <div class="links_to">

          <div class="option link_to" data-tab="filtrationBlockUser">
            <div class="ovg-option">
              <div class="option-line">
                <div class="labelField">
                  <span class="title"> Блокировка - Пользователи </span>
                </div>
              </div>
            </div>
          </div>

          <div class="option link_to" data-tab="filtrationBlockTerm" >
            <div class="ovg-option">
              <div class="option-line">
                <div class="labelField">
                  <span class="title"> Блокировка - Термины </span>
                </div>
              </div>
            </div>
          </div>

          <div class="option link_to" data-tab="filtrationHighlightUser" >
            <div class="ovg-option">
              <div class="option-line">
                <div class="labelField">
                  <span class="title"> Выделение - Пользователи </span>
                </div>
              </div>
            </div>
          </div>

          <div class="option link_to" data-tab="filtrationHighlightTerm" >
            <div class="ovg-option">
              <div class="option-line">
                <div class="labelField">
                  <span class="title"> Выделение - Термины </span>
                </div>
              </div>
            </div>
          </div>

          <div class="option link_to" data-tab="filtrationHighlightUserRole" >
            <div class="ovg-option">
              <div class="option-line">
                <div class="labelField">
                  <span class="title"> Выделение - Роль пользователя </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <main class="text" data-tab="filtrationBlockUser">
        <ovg-button class="flat-btn links_to ovg" style="display: flex; align-items: center;">
          <button style="margin-right: 10px;" data-tab="filtration" class="link_to ovg basic show small"> назад </button>
          <p style="margin: 5px 0 0 0;"> Блокировка - Пользователи </p>
        </ovg-button>

        <div class="blacklist">
          <wasd-input _ngcontent-gmb-c228="" _ngcontent-gmb-c28="" class="ng-valid ng-dirty ng-touched">
            <div ovg="" class="wasd-input-wrapper">
              <div ovg="" class="wasd-input">
                <label ovg=""></label>
                <input id="blacklistAddUser" ovg="" class="has-button ng-pristine ng-untouched ng-valid" placeholder=" Добавить пользователя " type="text">
                <button id="blacklistAddUserBtn" ovg="" type="button" class="button-icon">
                  <i ovg="" class="wasd-icons-add"></i>
                </button>
              </div>
            </div>
          </wasd-input>

          <table class="table-ovg user">
            <thead class="thead-ovg">
              <th class="table-heading-ovg">
                <div class="table-heading-text-ovg">Имя пользователя</div>
              </th>
              <th class="table-heading-ovg">
                <div class="table-heading-text-ovg">Время добавления</div>
              </th>
              <th class="table-heading-ovg remove">
                <div class="table-heading-text-ovg">Действия</div>
              </th>
            </thead>
            <tbody class="ovg-items">
            </tbody>
          </table>
        </div>
      </main>

      <main class="text" data-tab="filtrationBlockTerm">
        <ovg-button class="flat-btn links_to ovg" style="display: flex; align-items: center;">
          <button style="margin-right: 10px;" data-tab="filtration" class="link_to ovg basic show small"> назад </button>
          <p style="margin: 5px 0 0 0;"> Блокировка - Термины </p>
        </ovg-button>

        <div class="blacklist">
          <wasd-input _ngcontent-gmb-c228="" _ngcontent-gmb-c28="" class="ng-valid ng-dirty ng-touched">
            <div ovg="" class="wasd-input-wrapper">
              <div ovg="" class="wasd-input">
                <label ovg=""></label>
                <input id="blacklistAddTerm" ovg="" class="has-button ng-pristine ng-untouched ng-valid" placeholder=" Добавить термин " type="text">
                <button id="blacklistAddTermBtn" ovg="" type="button" class="button-icon">
                  <i ovg="" class="wasd-icons-add"></i>
                </button>
              </div>
            </div>
          </wasd-input>

          <table class="table-ovg term">
            <thead class="thead-ovg">
              <th class="table-heading-ovg">
                <div class="table-heading-text-ovg">Термин</div>
              </th>
              <th class="table-heading-ovg">
                <div class="table-heading-text-ovg">Время добавления</div>
              </th>
              <th class="table-heading-ovg remove">
                <div class="table-heading-text-ovg">Действия</div>
              </th>
            </thead>
            <tbody class="ovg-items">
            </tbody>
          </table>
        </div>
      </main>

      <main class="text" data-tab="filtrationHighlightUser">
        <ovg-button class="flat-btn links_to ovg" style="display: flex; align-items: center;">
          <button style="margin-right: 10px;" data-tab="filtration" class="link_to ovg basic show small"> назад </button>
          <p style="margin: 5px 0 0 0;"> Выделение - Пользователи </p>
        </ovg-button>

        <div class="highlight">
          <wasd-input _ngcontent-gmb-c228="" _ngcontent-gmb-c28="" class="ng-valid ng-dirty ng-touched">
            <div ovg="" class="wasd-input-wrapper">
              <div ovg="" class="wasd-input">
                <label ovg=""></label>
                <input id="highlightAddUser" ovg="" class="has-button ng-pristine ng-untouched ng-valid" placeholder=" Добавить пользователя " type="text">
                <button id="highlightAddUserBtn" ovg="" type="button" class="button-icon">
                  <i ovg="" class="wasd-icons-add"></i>
                </button>
                <div class="clr-field" style="color: #00000000;display: flex !important;">
                  <button aria-labelledby="clr-open-label" style="margin-right: -9px;border-radius: 0;"></button>
                  <input id="highlightAddUserColor" type="text" value="#00000000" data-coloris style="width: 40px;height: 29px;">
                </div>
              </div>
            </div>
          </wasd-input>

          <table class="table-ovg user">
            <thead class="thead-ovg">
              <th class="table-heading-ovg">
                <div class="table-heading-text-ovg">Имя пользователя</div>
              </th>
              <th class="table-heading-ovg">
                <div class="table-heading-text-ovg">Время добавления</div>
              </th>
              <th class="table-heading-ovg">
                <div class="table-heading-text-ovg">Цвет</div>
              </th>
              <th class="table-heading-ovg remove">
                <div class="table-heading-text-ovg">Действия</div>
              </th>
            </thead>
            <tbody class="ovg-items">
            </tbody>
          </table>
        </div>
      </main>

      <main class="text" data-tab="filtrationHighlightTerm">
        <ovg-button class="flat-btn links_to ovg" style="display: flex; align-items: center;">
          <button style="margin-right: 10px;" data-tab="filtration" class="link_to ovg basic show small"> назад </button>
          <p style="margin: 5px 0 0 0;"> Выделение - Термины </p>
        </ovg-button>

        <div class="highlight">
          <wasd-input _ngcontent-gmb-c228="" _ngcontent-gmb-c28="" class="ng-valid ng-dirty ng-touched">
            <div ovg="" class="wasd-input-wrapper">
              <div ovg="" class="wasd-input">
                <label ovg=""></label>
                <input id="highlightAddTerm" ovg="" class="has-button ng-pristine ng-untouched ng-valid" placeholder=" Добавить термин " type="text">
                <button id="highlightAddTermBtn" ovg="" type="button" class="button-icon">
                  <i ovg="" class="wasd-icons-add"></i>
                </button>
                <div class="clr-field" style="color: #00000000;display: flex !important;">
                  <button aria-labelledby="clr-open-label"style="margin-right: -9px;border-radius: 0;"></button>
                  <input id="highlightAddTermColor" type="text" value="#00000000" data-coloris style="width: 40px;height: 29px;">
                </div>
              </div>
            </div>
          </wasd-input>

          <table class="table-ovg term">
            <thead class="thead-ovg">
              <th class="table-heading-ovg">
                <div class="table-heading-text-ovg">Термин</div>
              </th>
              <th class="table-heading-ovg">
                <div class="table-heading-text-ovg">Время добавления</div>
              </th>
              <th class="table-heading-ovg">
                <div class="table-heading-text-ovg">Цвет</div>
              </th>
              <th class="table-heading-ovg remove">
                <div class="table-heading-text-ovg">Действия</div>
              </th>
            </thead>
            <tbody class="ovg-items">
            </tbody>
          </table>
        </div>
      </main>

      <main class="text" data-tab="filtrationHighlightUserRole">
        <ovg-button class="flat-btn links_to ovg" style="display: flex; align-items: center;">
          <button style="margin-right: 10px;" data-tab="filtration" class="link_to ovg basic show small"> назад </button>
          <p style="margin: 5px 0 0 0;"> Выделение - Роль пользователя </p>
        </ovg-button>

        <div class="highlight">
          <div style="margin-left: -10px; width: calc(100% + 20px);">
            ${HelperSettings.build('highlightRole')}
          </div>
        </div>
      </main>

      <main class="text" data-tab="twitch_authorize_public">
        <p class="twitch_authorize_content">
      </main>`;
    document.body.append(settingsDiv);
    BetterStreamChat.changelog = changelogList[0]

    settingsDiv.querySelector('#settingsSearchDiv button').addEventListener('click', () => {
      settingsSearchDiv.classList.remove('notfocused')
      settingsSearch.dispatchEvent(new Event('input'))
      settingsSearch.focus()
    });

    settingsSearch.addEventListener('blur', () => {
      settingsSearch.value = ''
      settingsSearchDiv.classList.add('notfocused')
    });

    // bttv events
    bttvAddUserBtn.addEventListener('click', () => {
      HelperBTTV.tryAddUser();
    });
    let bttvAddUser = settingsDiv.querySelector('#bttvAddUser')
    bttvAddUser.addEventListener('keyup', (event) => {
      if (event.key !== 'Enter') return;
      HelperBTTV.tryAddUser();
    });

    // ffz events
    ffzAddUserBtn.addEventListener('click', () => {
      HelperFFZ.tryAddUser();
    });
    let ffzAddUser = settingsDiv.querySelector('#ffzAddUser')
    ffzAddUser.addEventListener('keyup', (event) => {
      if (event.key !== 'Enter') return;
      HelperFFZ.tryAddUser();
    });

    // tv7 events
    tv7AddUserBtn.addEventListener('click', () => {
      HelperTV7.tryAddUser();
    });
    tv7AddUser.addEventListener('keyup', (event) => {
      if (event.key !== 'Enter') return;
      HelperTV7.tryAddUser();
    });


    // filtration events
    blacklistAddUserBtn.addEventListener('click', () => {
      text = blacklistAddUser.value
      if (text != '') HelperWASD.addUserToBL(text)
    });
    blacklistAddUser.addEventListener('keyup', (event) => {
      if (event.key !== 'Enter') return;
      text = blacklistAddUser.value
      HelperWASD.addUserToBL(text)
    });

    blacklistAddTermBtn.addEventListener('click', () => {
      text = blacklistAddTerm.value
      if (text != '') HelperWASD.addTermToBL(text)
    });
    blacklistAddTerm.addEventListener('keyup', (event) => {
      if (event.key !== 'Enter') return;
      text = blacklistAddTerm.value
      HelperWASD.addTermToBL(text)
    });

    highlightAddUserBtn.addEventListener('click', () => {
      text = highlightAddUser.value
      if (text != '') HelperWASD.addUserToHL(text)
    });
    highlightAddUser.addEventListener('keyup', (event) => {
      if (event.key !== 'Enter') return;
      text = highlightAddUser.value
      HelperWASD.addUserToHL(text)
    });

    highlightAddTermBtn.addEventListener('click', () => {
      text = highlightAddTerm.value
      if (text != '') HelperWASD.addTermToHL(text)
    });
    highlightAddTerm.addEventListener('keyup', (event) => {
      if (event.key !== 'Enter') return;
      text = highlightAddTerm.value
      HelperWASD.addTermToHL(text)
    });

    for (let user of Object.keys(settings.list.blockUserList)) {
      HelperWASD.addUserToBlackList(user)
    }
    for (let term of Object.keys(settings.list.blockTermList)) {
      HelperWASD.addTermToBlackList(term)
    }
    for (let user of Object.keys(settings.list.highlightUserList)) {
      HelperWASD.addUserToHighLight(user)
    }
    for (let term of Object.keys(settings.list.highlightTermList)) {
      HelperWASD.addTermToHighLight(term)
    }

    // bind close settings 
    settingsDiv.querySelector('.close').addEventListener('click', () => {
      Helper.hideSettings()
    });

    // bind update chat 
    settingsDiv.querySelector('.update').addEventListener('dblclick', () => {
      let header_block_menu = document.querySelectorAll('.header > div.header__block__menu div.header__block__menu__item')
      if (header_block_menu.length >= 1) {
        header_block_menu[1]?.click();
        settingsDiv.querySelector('.update > i').classList.add('resetPlayerLoading');
        header_block_menu[0]?.children[0]?.click()
      } else {
        if (settingsDiv.classList.contains('fullscreen')) {
          Helper.trySendMessage({ update_chat: true })
        } else {
          alertify.error(`Чат не найден.`)
        }
      }
    });

    // bind newtab settings
    settingsDiv.querySelector('.newtab').addEventListener('click', () => {
      let settings_window = window.open('https://wasd.tv/chat?helper-settings=settings', '_blank', 'location=yes,height=500,width=800')
      BetterStreamChat.isSettingsNewWindow = true
      let timer_settings_window = setInterval(() => { 
        if(settings_window.closed) {
          clearInterval(timer_settings_window);
          BetterStreamChat.isSettingsNewWindow = false
        }
      }, 200);
      window.onunload = () => { settings_window?.close() }
      settingsDiv.querySelector('.close').click()
    });

    // bind update emotes
    settingsDiv.querySelector('.updateemotes').addEventListener('dblclick', () => {
      let header_block_menu = document.querySelector('.header > div.header__block__menu')

      settingsDiv.querySelector('.updateemotes > i').classList.add('resetPlayerLoading');
      setTimeout(() => {
        settingsDiv.querySelector('.updateemotes > i').classList.remove('resetPlayerLoading');
      }, 1000);

      HelperBTTV.updateEmotesBttv();
      HelperFFZ.updateEmotesFfz();
      HelperTV7.updateEmotesTv7();
    });

    if (Cookies.get('BetterWASD_access_token')) {
      settingsDiv.querySelector('.twitch_authorize_public').setAttribute('disabled', '')
      settingsDiv.querySelector('.twitch_authorize_public .tooltip-content').textContent = 'Авторизовано: ' + Cookies.get('BetterWASD_twitch_display_name')
    }

    // bind twitch_authorize_public
    settingsDiv.querySelector('.twitch_authorize_public').addEventListener('click', () => {
      window.open('https://id.twitch.tv/oauth2/authorize?client_id=' + HelperTwitch['Client-ID'] + '&redirect_uri=' + encodeURIComponent('https://wasd.tv/') + '&response_type=token')
    });

    // bind search settings
    let filter1, ul1, options1, title1, titleline1, i1;
    settingsSearch.addEventListener('input', () => {
      filter1 = settingsSearch.value.toUpperCase();
      ul1 = document.querySelector("main[data-tab='wasdSettings']");
      options1 = ul1.querySelectorAll("div.option");
      for (i1 = 0; i1 < options1.length; i1++) {
        title1 = options1[i1].querySelector("span.title");
        if (title1) {
          if (title1.innerHTML.toUpperCase().indexOf(filter1) > -1) {
            options1[i1].style.display = "";
          } else {
            options1[i1].style.display = "none";
          }
        }

        titleline1 = options1[i1].querySelector("span.titleline");
        if (titleline1) {
          if (filter1 == '') {
            options1[i1].style.display = "";
          } else {
            options1[i1].style.display = "none";
          }
        }
      }
    });

    // bind search emoji
    let bwasdfilter, bwasdul, bwasdoptions, bwasdtitle, bwasdtitleline, bwasdi;
    bwasdemojiSearch.addEventListener('input', () => {
      bwasdfilter = bwasdemojiSearch.value.toUpperCase();
      bwasdul = document.querySelector("main[data-tab='bwasdSettings'] > #bwasdEmoteList");
      bwasdoptions = bwasdul.querySelectorAll(".div_emoteCard");
      for (bwasdi = 0; bwasdi < bwasdoptions.length; bwasdi++) {
        bwasdtitle = bwasdoptions[bwasdi].querySelector("span");
        if (bwasdtitle) {
          if (bwasdtitle.textContent.toUpperCase().indexOf(bwasdfilter) != -1) {
            bwasdoptions[bwasdi].style.display = "";
          } else {
            bwasdoptions[bwasdi].style.display = "none";
          }
        }
      }
    });

    let bttvfilter, bttvul, bttvoptions, bttvtitle, bttvtitleline, bttvi;
    bttvemojiSearch.addEventListener('input', () => {
      bttvfilter = bttvemojiSearch.value.toUpperCase();
      bttvul = document.querySelector("main[data-tab='bttvSettings'] > #bttvEmoteList");
      bttvoptions = bttvul.querySelectorAll(".div_emoteCard");
      for (bttvi = 0; bttvi < bttvoptions.length; bttvi++) {
        bttvtitle = bttvoptions[bttvi].querySelector("span");
        if (bttvtitle) {
          if (bttvtitle.textContent.toUpperCase().indexOf(bttvfilter) != -1) {
            bttvoptions[bttvi].style.display = "";
          } else {
            bttvoptions[bttvi].style.display = "none";
          }
        }
      }
    });

    let ffzfilter, ffzul, ffzoptions, ffztitle, ffztitleline, ffzi;
    ffzemojiSearch.addEventListener('input', () => {
      ffzfilter = ffzemojiSearch.value.toUpperCase();
      ffzul = document.querySelector("main[data-tab='ffzSettings'] > #ffzEmoteList");
      ffzoptions = ffzul.querySelectorAll(".div_emoteCard");
      for (ffzi = 0; ffzi < ffzoptions.length; ffzi++) {
        ffztitle = ffzoptions[ffzi].querySelector("span");
        if (ffztitle) {
          if (ffztitle.textContent.toUpperCase().indexOf(ffzfilter) != -1) {
            ffzoptions[ffzi].style.display = "";
          } else {
            ffzoptions[ffzi].style.display = "none";
          }
        }
      }
    });

    let tv7filter, tv7ul, tv7options, tv7title, tv7titleline, tv7i;
    tv7emojiSearch.addEventListener('input', () => {
      tv7filter = tv7emojiSearch.value.toUpperCase();
      tv7ul = document.querySelector("main[data-tab='tv7Settings'] > #tv7EmoteList");
      tv7options = tv7ul.querySelectorAll(".div_emoteCard");
      for (tv7i = 0; tv7i < tv7options.length; tv7i++) {
        tv7title = tv7options[tv7i].querySelector("span");
        if (tv7title) {
          if (tv7title.textContent.toUpperCase().indexOf(tv7filter) != -1) {
            tv7options[tv7i].style.display = "";
          } else {
            tv7options[tv7i].style.display = "none";
          }
        }
      }
    });

    // backup
    settingsDiv.querySelector('.backup-upload').addEventListener('click', () => {
      settingsDiv.querySelector('#importInput').click()
    });

    settingsDiv.querySelector('input#importInput').onchange = (() => {
      let files = settingsDiv.querySelector('input#importInput').files[0]
      let reader = new FileReader()
      reader.onload = processFile(files)
      if (files.name.indexOf('.backup') == files.name.length - 7 || files.name.indexOf('.backup.txt') == files.name.length - 11) {
        reader.readAsText(files)
      } else {
        alertify.warning(`только .backup файлы`, 3)
      }
    })

    processFile = (theFile) => {
      return (e) => {
        chrome.storage[storageType].set(JSON.parse(e.target.result), () => {
          location.reload()
          Helper.trySendMessage({ location: 'reload' });
          alertify.warning(`Перезагрузка страницы`, 5)
        })
      }
    }

    // show-section-mobile
    settingsDiv.querySelector('.show-section-mobile').addEventListener('click', () => {
      settingsDiv.querySelector('section').classList.toggle('mobile-show')
      settingsDiv.querySelector('.show-section-mobile').classList.toggle('active')
    });


    /************/

    settingsDiv.ondragenter = (e) => {
      e.preventDefault();
    };
    settingsDiv.ondragover = (e) => {
      e.preventDefault();
      settingsDiv.classList.add('dragoverbackup');
    }
    settingsDiv.ondragleave = (e) => {
      e.preventDefault();
      settingsDiv.classList.remove('dragoverbackup');
    }
    settingsDiv.ondrop = (e) => {
      e.preventDefault();
      settingsDiv.classList.remove('dragoverbackup');
    };


    backupDropContainer.ondragenter = (e) => {
      e.preventDefault();
    };
    backupDropContainer.ondragover = (e) => {
      e.preventDefault();
      backupDropContainer.classList.add('dragover');
    }
    backupDropContainer.ondragleave = (e) => {
      e.preventDefault();
      backupDropContainer.classList.remove('dragover');
    }
    backupDropContainer.ondrop = (e) => {
      e.preventDefault();
      backupDropContainer.classList.remove('dragover');
      let reader = new FileReader();
      reader.onload = processFile(e.dataTransfer.files[0]);
      let n = e.dataTransfer?.files[0]?.name

      if (n && n.indexOf('.backup') == n.length - 7 || n && n.indexOf('.backup.txt') == n.length - 11) {
        reader.readAsText(e.dataTransfer.files[0]);
      } else {
        alertify.warning(`только .backup файлы`, 3);
      }
    };

    /************/

    settingsDiv.querySelector('.backup-download').addEventListener('click', () => {
      HelperWASD.download(`BetterWASD-settings.backup`, JSON.stringify(settings));
    });

    settingsDiv.querySelector('.backup-reset').addEventListener('dblclick', () => {
      chrome.storage[storageType].set(Helper.getDefaultSettings(), () => {
        location.reload()
        Helper.trySendMessage({ location: 'reload' });
      })
    });

    // link to navigation
    for (let link of settingsDiv.querySelectorAll('.links_to .link_to')) {
      link.addEventListener('click', ({ target }) => {

        // console.log(target.classList.value)
        if (target.classList.value == 'slider-ovg' || target.classList.value == 'optionField') return

        let tabs = settingsDiv.querySelectorAll('main');
        for (let element of [...tabs]) {
          element.classList.remove('active');
        }

        if (target.getAttribute('data-tab') == 'bot') {
          settingsSearchDiv.classList.remove('hidden')
        } else {
          settingsSearchDiv.classList.add('hidden')
        }

        settingsDiv.querySelector(`main[data-tab="${target.dataset.tab}"]`).classList.add('active');

      });
    }

    // navigation old
    for (let navItem of settingsDiv.querySelectorAll('section .items > a')) {
      navItem.addEventListener('click', ({ target }) => {
        let links = settingsDiv.querySelectorAll('section .items > a');
        let tabs = settingsDiv.querySelectorAll('main');
        for (let element of [...tabs, ...links]) {
          element.classList.remove('active');
        }

        if (target.getAttribute('data-tab') == 'wasdSettings') {
          settingsSearchDiv.classList.remove('hidden')
        } else {
          settingsSearchDiv.classList.add('hidden')
        }

        if (target.getAttribute('data-tab') == 'about') {
          HelperWASD.startTimerStatData()
        } else {
          HelperWASD.stopTimerStatData()
        }

        target.classList.add('active');
        settingsDiv.querySelector(`main[data-tab="${target.dataset.tab}"]`).classList.add('active');
      });
    }

    // navigation new
    for (let navItem of settingsDiv.querySelectorAll('#nav-sidebar .nav-sidebar__item')) {
      navItem.addEventListener('click', ({ target }) => {
        let links = settingsDiv.querySelectorAll('#nav-sidebar .nav-sidebar__item');
        let tabs = settingsDiv.querySelectorAll('main');
        for (let element of [...tabs]) {
          element.classList.remove('active');
        }
        for (let element of [...links]) {
          element.classList.remove('nav-sidebar__item--active');
        }

        if (target.getAttribute('data-tab') == 'wasdSettings') {
          settingsSearchDiv.classList.remove('hidden')
        } else {
          settingsSearchDiv.classList.add('hidden')
        }

        if (target.getAttribute('data-tab') == 'about') {
          HelperWASD.startTimerStatData()
        } else {
          HelperWASD.stopTimerStatData()
        }

        target.classList.add('nav-sidebar__item--active');
        settingsDiv.querySelector(`main[data-tab="${target.dataset.tab}"]`).classList.add('active');
      });
    }

    // open nav sidebar
    settingsDiv.querySelector('wasd-nav-sidebar').addEventListener('click', () => {
      if (settingsDiv.querySelector('wasd-nav-sidebar[ovg]').classList.contains('nav-sidebar--expanded')) {
        settingsDiv.querySelector('wasd-nav-sidebar[ovg]').classList.remove('nav-sidebar--expanded')
        settingsDiv.querySelector('.open-nav-sidebar').classList.remove('nav-sidebar-toggle--active')
      }
    })
    settingsDiv.querySelector('.open-nav-sidebar').addEventListener('click', () => {
      settingsDiv.querySelector('wasd-nav-sidebar[ovg]').classList.toggle('nav-sidebar--expanded')
      settingsDiv.querySelector('.open-nav-sidebar').classList.toggle('nav-sidebar-toggle--active')
    })

    goToObsChatSetting.addEventListener('click', () => {
      Helper.trySendMessage({ createWindow: `https://ovgamesdev.github.io/BetterWASD.obs_chat/settings/?channel_name=${HelperWASD.self_channel_name}&private_link=${HelperWASD.closedViewUrl}` });
    })


    settingsDiv.querySelector('.ovg-tabs-wrapper').addEventListener('click', () => {
      settingsDiv.querySelector('.show-section-mobile')?.click()
    })


    // to def
    for (let option of settingsDiv.querySelectorAll('.optionField.def')) {
      option.addEventListener('click', (event) => {
        let split = event.target.dataset.name.split('_');
        switch (event.target.getAttribute('option-type')) {
          // case 'boolean':
          //     event.target.parentElement.querySelector(`input[id=boolean_${event.target.getAttribute('data-name')}]`).checked = Helper.getDefaultSettings()[split[0]][split[1]]
          //     HelperSettings.save([event.target.parentElement.querySelector('input[type="checkbox"]')])
          //     break;
          // case 'text':
          //     event.target.parentElement.querySelector('input[type="text"]').value = Helper.getDefaultSettings()[split[0]][split[1]]
          //     HelperSettings.save([event.target.parentElement.querySelector('input[type="text"]')])
          //     break;
          case 'number':
            event.target.parentElement.querySelector('input[type="number"]').value = Helper.getDefaultSettings()[split[0]][split[1]]
            event.target.parentElement.querySelector('input[type="number"]').dispatchEvent(new Event('change'));
            break;
          case 'select':
            event.target.parentElement.querySelector('select').value = Helper.getDefaultSettings()[split[0]][split[1]]
            event.target.parentElement.querySelector('select').dispatchEvent(new Event('change'));
            break;
          case 'color':
            let defVal = Helper.varColorToColor(Helper.getDefaultSettings()[split[0]][split[1]])
            event.target.parentElement.querySelector('input[data-coloris]').value = defVal
            event.target.parentElement.style.color = defVal
            event.target.parentElement.querySelector('input[data-coloris]').dispatchEvent(new Event('change'));
            break;
            // case 'botevent':
            //     if (Helper.getDefaultSettings()[split[0]][split[1]]) {
            //         event.target.parentElement.querySelector(`input[id=boolean_${event.target.getAttribute('data-name')}]`).click()
            //     } else {
            //         event.target.parentElement.querySelector(`input[id=boolean_${event.target.getAttribute('data-name')}_no]`).click()
            //     }
            //     event.target.parentElement.querySelector('input[type="text"]').value = Helper.getDefaultSettings()[split[0]][split[1]][0]
            //     HelperSettings.save([event.target.parentElement.querySelector('input[type="text"]')])
            //     break;
          default:
            ovg.log('def')
            break;
        }
      });
    }

    for (let option of settingsDiv.querySelectorAll('.optionField')) {
      option.addEventListener('contextmenu', (event) => {
        let split = event.target.dataset.name.split('_');
        switch (event.target.getAttribute('option-type')) {
          // case 'boolean':
          //     event.target.parentElement.querySelector(`input[id=boolean_${event.target.getAttribute('data-name')}]`).checked = Helper.getDefaultSettings()[split[0]][split[1]]
          //     HelperSettings.save([event.target.parentElement.querySelector('input[type="checkbox"]')])
          //     break;
          // case 'text':
          //     event.target.parentElement.querySelector('input[type="text"]').value = Helper.getDefaultSettings()[split[0]][split[1]]
          //     HelperSettings.save([event.target.parentElement.querySelector('input[type="text"]')])
          //     break;
          case 'number':
            event.target.parentElement.querySelector('input[type="number"]').value = Helper.getDefaultSettings()[split[0]][split[1]]
            event.target.parentElement.querySelector('input[type="number"]').dispatchEvent(new Event('change'));
            break;
          case 'select':
            event.target.parentElement.querySelector('select').value = Helper.getDefaultSettings()[split[0]][split[1]]
            event.target.parentElement.querySelector('select').dispatchEvent(new Event('change'));
            break;
          case 'color':
            let defVal = Helper.varColorToColor(Helper.getDefaultSettings()[split[0]][split[1]])
            event.target.parentElement.querySelector('input[data-coloris]').value = defVal
            event.target.parentElement.style.color = defVal
            event.target.parentElement.querySelector('input[data-coloris]').dispatchEvent(new Event('change'));
            break;
            // case 'botevent':
            //     if (Helper.getDefaultSettings()[split[0]][split[1]]) {
            //         event.target.parentElement.querySelector(`input[id=boolean_${event.target.getAttribute('data-name')}]`).click()
            //     } else {
            //         event.target.parentElement.querySelector(`input[id=boolean_${event.target.getAttribute('data-name')}_no]`).click()
            //     }
            //     event.target.parentElement.querySelector('input[type="text"]').value = Helper.getDefaultSettings()[split[0]][split[1]][0]
            //     HelperSettings.save([event.target.parentElement.querySelector('input[type="text"]')])
            //     break;
          default:
            ovg.log('def')
            break;
        }
        event.preventDefault();
      });
    }



    // change event
    for (let option of settingsDiv.querySelectorAll('.optionField')) {
      option.addEventListener('change', (event) => {
        // HelperSettings.save([event.target]);

        let split = option.dataset.name.split('_');
        let value = null;

        if (option.type === 'radio' && option.classList.contains('botevent')) {
          value = option.checked && option.value === '1';
        } else if (option.type === 'text' && option.classList.contains('botevent')) {
          value = option.value;
        } else if (option.type === 'radio') {
          value = option.checked && option.value === '1';
        } else if (option.type === 'checkbox') {
          value = option.checked;
        } else if (option.dataset.type === 'number' || option.type === 'number') {
          value = parseFloat(option.value);
        } else {
          value = option.value;
        }

        Helper.trySendMessage({ update_save: { split: split, value: value } })

      });
    }

    $("#blacklistAddUser").autocomplete({
      source: (request, response) => {
        $.ajax({
          url: `https://wasd.tv/api/search/profiles?limit=5&offset=0&search_phrase=${blacklistAddUser.value.toLowerCase()}`,
          success: (data) => {
            response($.map(data?.result?.rows, (item) => {
              return {
                label: item.user_login,
                value: item.user_login,
                logo: item.profile_image.small
              }
            }));
          }
        });
      }
    });

    $("#highlightAddUser").autocomplete({
      source: (request, response) => {
        $.ajax({
          url: `https://wasd.tv/api/search/profiles?limit=5&offset=0&search_phrase=${highlightAddUser.value.toLowerCase()}`,
          success: (data) => {
            response($.map(data?.result?.rows, (item) => {
              return {
                label: item.user_login,
                value: item.user_login,
                logo: item.profile_image.small
              }
            }));
          }
        });
      }
    });

    $("#bttvAddUser").autocomplete({
      source: (request, response) => {
        $.ajax({
          url: `https://api.twitch.tv/helix/search/channels?query=${bttvAddUser.value.toLowerCase()}&first=5`,
          headers: {
            'Client-ID': HelperTwitch['Client-ID'],
            'Authorization': 'Bearer ' + Cookies.get('BetterWASD_access_token')
          },
          success: (data) => {
            response($.map(data.data, (item) => {
              return {
                label: item.display_name,
                value: item.display_name,
                logo: item.thumbnail_url
              }
            }));
          }
        });
      }
    });

    $("#ffzAddUser").autocomplete({
      source: (request, response) => {
        $.ajax({
          url: `https://api.twitch.tv/helix/search/channels?query=${ffzAddUser.value.toLowerCase()}&first=5`,
          headers: {
            'Client-ID': HelperTwitch['Client-ID'],
            'Authorization': 'Bearer ' + Cookies.get('BetterWASD_access_token')
          },
          success: (data) => {
            response($.map(data.data, (item) => {
              return {
                label: item.display_name,
                value: item.display_name,
                logo: item.thumbnail_url
              }
            }));
          }
        });
      }
    });

    $("#tv7AddUser").autocomplete({
      source: (request, response) => {
        $.ajax({
          url: `https://api.twitch.tv/helix/search/channels?query=${tv7AddUser.value.toLowerCase()}&first=5`,
          headers: {
            'Client-ID': HelperTwitch['Client-ID'],
            'Authorization': 'Bearer ' + Cookies.get('BetterWASD_access_token')
          },
          success: (data) => {
            response($.map(data.data, (item) => {
              return {
                label: item.display_name,
                value: item.display_name,
                logo: item.thumbnail_url
              }
            }));
          }
        });
      }
    });

    // bind wasd-input
    for (let wasdinput of settingsDiv.querySelectorAll('wasd-input')) {
      let label = wasdinput.querySelector('label[ovg]')
      let input = wasdinput.querySelector('input[ovg]')
      let text = input?.placeholder
      if (label) label.textContent = text
      wasdinput.querySelector('input')?.addEventListener('focus', () => {
        label?.classList.add('show')
        input.placeholder = ''
      })
      wasdinput.querySelector('input')?.addEventListener('blur', () => {
        label?.classList.remove('show')
        input.placeholder = text
      })
      wasdinput.querySelector('button')?.addEventListener('click', () => {
        input.value = ''
        input.dispatchEvent(new Event('input'))
      })
    }

    // bind Тестовое уведомление
    testNotify.addEventListener('click', () => {
      Helper.notify(`Тест`, `Тестовое уведомление`, 'test')
    })

    // bind Уведомления
    let isOpenBell = false
    let bell__info = ovg_bell__element.querySelector('.bell__info')
    let bell_button = ovg_bell__element.querySelector('.bell_button')
    document.body.addEventListener('click', (e) => {
      if (!e.target.className.match('bell') && isOpenBell) {
        Helper.setNotifyReaded()
        bell__info.setAttribute('hidden', '')
        isOpenBell = false
      }
      if (e.target.className.match('bell__icon') && isOpenBell) {
        setTimeout(() => {
          Helper.setNotifyReaded()
          bell__info.setAttribute('hidden', '')
          isOpenBell = false
        }, 50)
      }
    })
    bell_button.addEventListener('click', () => {
      setTimeout(() => {
        bell__info.removeAttribute('hidden')
        isOpenBell = true
      }, 50)
    })

    let tooltips = settingsDiv.querySelectorAll(".tooltip-wrapper");
    for (let tooltip of tooltips) {
      $( tooltip ).tooltip({
        classes: { "ui-tooltip": "ui-ovg-tooltip" },
        content: tooltip.title,
        show: false,
        hide: false,
        position: {
          my: "center bottom",
          at: "center top-5",
          within: $('#bscSettingsPanel')
        }
      });
    }

    for (let select of settingsDiv.querySelectorAll('select')) {
      select.onfocus = (e) => e.target.classList.add('active')
      select.onblur = (e) => e.target.classList.remove('active')

      select.onchange = (e) => e.target.blur()
    }

    this.install();

    // load bwasd, bttv, ffz and 7tv emotes
    await HelperBWASD.update();
    HelperBWASD.loaded();

    await HelperBTTV.update();
    HelperBTTV.loaded();

    await HelperFFZ.update();
    HelperFFZ.loaded();

    await HelperTV7.update();
    HelperTV7.loaded();

    // load chat
    HelperWASD.loaded();

  },
  install() {
    this.activeInstance = 'wasd'
    wasd.init();
  },
  uninstall() {
    wasd.uninstall();
    this.activeInstance = null;
  },
  update() {
    if (this.activeInstance) {
      wasd.updatestyle();
      $('.blacklist .user .ovg-items').empty();
      for (let user of Object.keys(settings.list.blockUserList)) {
        HelperWASD.addUserToBlackList(user)
      }

      $('.blacklist .term .ovg-items').empty();
      for (let term of Object.keys(settings.list.blockTermList)) {
        HelperWASD.addTermToBlackList(term)
      }

      $('.highlight .user .ovg-items').empty();
      for (let user of Object.keys(settings.list.highlightUserList)) {
        HelperWASD.addUserToHighLight(user)
      }

      $('.highlight .term .ovg-items').empty();
      for (let term of Object.keys(settings.list.highlightTermList)) {
        HelperWASD.addTermToHighLight(term)
      }
    }
  },
  openSettings() {
    if (HelperWASD.closedViewUrl  == 'none' || HelperWASD.self_channel_name == 'none') {
      $.ajax({
        url: `https://wasd.tv/api/v2/profiles/current/broadcasts/closed-view-url`,
        success: (out) => {
          HelperWASD.closedViewUrl = out.result.view_url.replace('https://wasd.tv/private-stream/', '')
          $.ajax({
            url: `https://wasd.tv/api/v2/profiles/current`,
            success: (out) => {
              HelperWASD.self_channel_name = out.result.user_profile.user_login
            }
          });
        }
      });
    }

    Helper.buildBell()

    if (document.querySelector('main.active[data-tab="about"]')) {
      HelperWASD.startTimerStatData()
    }

  }
}




$.widget("app.autocomplete", $.ui.autocomplete, {
  _renderItem: (ul, item) => {
    return $( "<li>" )
      .append( `<div class='ui-menu-item-icon' style='background-image: url(${item.logo})'> ${item.label} </div>` )
      .appendTo( ul );
  }
});