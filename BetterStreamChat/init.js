const BetterStreamChat = {
  activeInstance: null,
  settingsDiv: null,
  isSettingsNewWindow: false,
  changelog: "",
  async init() {
    let changelogLabels = {
      fixed: '<span class="label" style="color: var(--wasd-color-text-prime);background: none;font-weight: 600;">Исправлено</span>',
      added: '<span class="label" style="color: var(--wasd-color-text-prime);background: none;font-weight: 600;">Добавлено</span>',
      changed: '<span class="label" style="color: var(--wasd-color-text-prime);background: none;font-weight: 600;">Изменено</span>',
      optimized: '<span class="label" style="color: var(--wasd-color-text-prime);background: none;font-weight: 600;">Оптимизировано</span>',
      removed: '<span class="label" style="color: var(--wasd-color-text-prime);background: none;font-weight: 600;">Удалено</span>',
    };
    let changelogList = [
      {
        version: "1.6.14",
        date: "2022-10-21T13:07:00.829Z",
        items: [
          {
            text: [
              "Переместить кнопку 'Скрыть чат' в заголовок чата.",
              "Обновить чат (нажмите дважды).",
              "Автозаполнение эмоции через Tab.",
              "Показывать последние сообщения в окне ввода на клавишу «↑» и «↓».",
              "Формат отметок времени.",
            ],
            label: "fixed",
          },
          {
            text: [
              "Предварительный просмотр при наведении курсора на канал в сети.",
              "ZeroWidth эмоции теперь поддерживает wasd.",
              "Автозаполнение эмоции через Tab теперь поддерживает смайлики wasd.",
              "Добавить поиск в меню смайлов wasd.",
              "Добавить поиск в меню смайлов BWASYA.",
            ],
            label: "added",
          },
          {
            text: [
              "Поменять панель подарков и информацию о стриме местами.",
              "Отображение стикеров BWASYA, BTTV, FFZ и 7TV.",
              "Подсказка для эмоций BWASYA, BTTV, FFZ и 7TV при наведении.",
              "Разрешение смайликов в чате BWASYA, BTTV, FFZ и 7TV.",
              "Смайлики 7TV | FFZ | BTTV в чате.",
              "Опция 7TV | FFZ | BTTV в меню смайликов в чате.",
              "Размер стикеров BWASYA.",
            ],
            label: "removed",
          },
        ],
      },
      {
        version: "1.6.13",
        date: "2022-10-11T12:42:09.803Z",
        items: [
          {
            text: ['Скрыть "поддержать" в панели ввода текста.', "Добавить в текстовое поле.", "Опции в меню смайликов в чате.", "Нажмите клавишу '...' чтобы..."],
            label: "fixed",
          },
        ],
      },
      {
        version: "1.6.12",
        date: "2022-09-06T15:01:51.988Z",
        items: [
          {
            text: ['Скрыть "поддержать" в панели ввода текста.'],
            label: "fixed",
          },
          {
            text: ["BetterWS. (Будет работать до 28 ноября, затем поддержка временно прекратится)"],
            label: "changed",
          },
        ],
      },
      {
        version: "1.6.11",
        date: "2022-08-03T11:43:21.479Z",
        items: [
          {
            text: ["bugs."],
            label: "added",
          },
          {
            text: ["BetterWASYA - пытается снизить нагрузку на сервер."],
            label: "optimized",
          },
        ],
      },
      {
        version: "1.6.10",
        date: "2022-07-22T15:30:55.484Z",
        items: [
          {
            text: ["Поменять панель подарков и информацию о стриме местами.", "Взаимодействие с контекстом wasd.tv а точнее:", "Стиль удаленных сообщений.", "Меню модератора."],
            label: "fixed",
          },
        ],
      },
      {
        version: "1.6.9",
        date: "2022-07-10T13:46:52.369Z",
        items: [
          {
            text: ["Меню модератора - Как у BTTV."],
            label: "optimized",
          },
        ],
      },
      {
        version: "1.6.8",
        date: "2022-06-25T19:55:45.055Z",
        items: [
          {
            text: ["Значок подписчика BetterWASYA."],
            label: "fixed",
          },
          {
            text: ["Поддержка персональных эмоций BetterWASYA."],
            label: "added",
          },
          {
            text: ["Меню модератора - Как у BTTV."],
            label: "optimized",
          },
          {
            text: ["Поддержка эмоций пользователя 7TV.", "Поддержка эмоций пользователя BetterTTV.", "Поддержка эмоций пользователя FrankerFaceZ."],
            label: "removed",
          },
        ],
      },
    ];

    let changelogHtml = "";
    for (let changelog of changelogList.slice(0, 5)) {
      changelogHtml += `<h2 style="color: var(--wasd-color-text-prime);">Version ${changelog.version} (${moment(changelog.date).format(
        "YYYY-MM-DD"
      )})</h2><ul style="display: grid;padding-inline-start: 4px;margin: 5px 0;">`;

      for (let item of changelog.items) {
        if (item.label) {
          let labelHtml = "";
          let labels = item.label.split(" ");
          for (let label of labels) {
            changelogHtml += changelogLabels[label];
          }

          for (let text of item.text) {
            changelogHtml += `<span class="textlabel">• ${text}</span>`;
          }
        }
        if (item.issueID) {
          item.text += ` (<a target="_blank" href="https://github.com/ovgamesdev/BetterWASYA.tv/issues/${item.issueID}">#${item.issueID}</a>)`;
        }
      }
      changelogHtml += "</ul>";
    }

    let settingsDiv = document.createElement("div");
    this.settingsDiv = settingsDiv;
    settingsDiv.style.display = "none";
    settingsDiv.id = "bscSettingsPanel";
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
            <img alt="BetterWASYA.TV" src="">
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
            <!--button class="basic medium-cube ovg hide-fullscreen newtab" type="button">
              <i class="ovg wasd-icons-extract"></i>
              <ovg-tooltip><div class="tooltip tooltip_position-bottomRight tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left"> Открыть настройки в новом окне </div></div></ovg-tooltip>
            </button-->
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
            <a role="tab" class="item" data-tab="appearanceDesign">Оформление (beta)</a>
            <a role="tab" class="item" data-tab="emotes">Эмоции</a>
            <a role="tab" class="item" data-tab="filtration">Фильтрация</a>
            <!--a class="item" id="goToObsChatSetting2">Чат для OBS (beta) <i class="icon wasd-icons-extract" style="padding-left: 5px;"></i></a-->
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
              <a ovg="" class="nav-sidebar__item" data-tab="appearanceDesign" style="position: relative;">
                <i ovg="" class="ovg-icon-paint"></i>
                <span ovg="">Оформление (beta)</span>
                <ovg-tooltip>
                  <div class="tooltip tooltip_position-right tooltip_size-small" style="width: 260px;">
                    <div class="tooltip-content tooltip-content_left"> Оформление (beta) </div>
                  </div>
                </ovg-tooltip>
              </a>
            </li>
            <li ovg="">
              <a ovg="" class="nav-sidebar__item" data-tab="bwasdSettings" style="position: relative;">
                <i ovg="" class="wasd-icons-smile"></i>
                <span ovg="">Эмоции</span>
                <ovg-tooltip>
                  <div class="tooltip tooltip_position-right tooltip_size-small" style="width: 260px;">
                    <div class="tooltip-content tooltip-content_left"> Эмоции </div>
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
            <!--li ovg="">
              <a ovg="" class="nav-sidebar__link" style="position: relative;" id="goToObsChatSetting">
                <i ovg="" class="ovg-icon-chat"></i>
                <span ovg="">Чат для OBS (beta) <i class="icon wasd-icons-extract" style="padding-left: 5px;"></i></span>
                <ovg-tooltip>
                  <div class="tooltip tooltip_position-right tooltip_size-small" style="width: 260px;">
                    <div class="tooltip-content tooltip-content_left"> Чат для OBS (beta) <i class="icon wasd-icons-extract" style="padding-left: 5px;"></i> </div>
                  </div>
                </ovg-tooltip>
              </a>
            </li-->
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
          <span style="font-size: 21px;">Напишите отзыв на <a target="_blank" href="https://chrome.google.com/webstore/detail/cokaeiijnnpcfaoehijmdfcgbkpffgbh">Chrome Webstore</a></span>
        </div>

        <div style="padding: 10px;">
          <span>Автор: <a href="https://betterwasya.vercel.app/" target="_blank">OvGames</a> | <a href="https://wasd.tv/ovgames" target="_blank">WASD</a></span> | <a href="https://t.me/BetterWASYA" target="_blank">Telegram</a></span>
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

        <div style="top: 48px;right: 0px;position: absolute;">
          <img src="${git_url}/betterwasya_qr_tg.webp" style="width: 140px;margin: 10px;">
        </div>

        <div class="bottom footer">
          <span>Version ${changelogList[0].version} (${moment(changelogList[0].date).format("YYYY-MM-DD")})</span>
          <div class="right tooltip-hover" style="position: relative;">
            <div class="active-tech-status-ovg"></div>
            <span class="activeUsers tech-info-ovg">0</span>
            <ovg-tooltip><div class="tooltip tooltip_position-topRight tooltip_size-small" style="width: 260px;right: -4px;"><div class="tooltip-content tooltip-content_left"> Активных пользователей </div></div></ovg-tooltip>
            
            <!--div><span class="activeChannelUsers">0</span><span> пользователей просматривающие канал </span><span  class="activeChannel"></span></div-->
          </div>
        </div>

      </main>
      <main id="general" data-tab="general">
        ${HelperSettings.build("general")}
      </main>

      <main class="text" data-tab="bwasdSettings">
        <!--ovg-button class="flat-btn links_to ovg" style="display: flex; align-items: center;">
          <button style="margin-right: 10px;" data-tab="emotes" class="link_to ovg basic show small"> назад </button>
          <p style="margin: 5px 0 0 0;"> BetterWASYA </p>
        </ovg-button-->

        <h2> Доступные эмоции BetterWASYA <a target="_blank" href="https://betterwasya.vercel.app/dashboard/emotes">Добавить свою эмоцию</a> </h2>

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

      <main class="active" data-tab="wasdSettings">
        ${HelperSettings.build("wasd")}
      </main>

      <main class="" data-tab="appearanceDesign">
        <h1 style="padding-left: 10px;padding-top: 10px;"> Оформление (beta) </h1>
        ${HelperSettings.build("colors")}
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
        <ovg-button class="flat-btn links_to ovg" style="display: flex;align-items: center;margin: 0 0 8px;">
          <button style="margin-right: 10px;" data-tab="filtration" class="link_to ovg basic show small"> назад </button>
          <p style="margin: 5px 0 0 0;"> Выделение - Роль пользователя </p>
        </ovg-button>

        <p style="margin: 0 0 5px 0;">Используете <span class="tech-info-ovg">#000000</span> или <span class="tech-info-ovg">#00000000</span> чтобы сбросить цвет. </p>
        <p style="margin: 0 0 5px 0;">Если вам нужен <span class="tech-info-ovg">#000000</span> вы можете использовать ближний к нему цвет <span class="tech-info-ovg">#010101</span>. </p>

        <div class="highlight">
          <div style="margin-left: -10px; width: calc(100% + 20px);">
            ${HelperSettings.build("highlightRole")}
          </div>
        </div>
      </main>`;
    document.body.append(settingsDiv);
    BetterStreamChat.changelog = changelogList[0];

    settingsDiv.querySelector("#settingsSearchDiv button").addEventListener("click", () => {
      settingsSearchDiv.classList.remove("notfocused");
      settingsSearch.dispatchEvent(new Event("input"));
      settingsSearch.focus();
    });

    settingsSearch.addEventListener("blur", () => {
      settingsSearch.value = "";
      settingsSearchDiv.classList.add("notfocused");
    });

    // filtration events
    blacklistAddUserBtn.addEventListener("click", () => {
      text = blacklistAddUser.value;
      if (text != "") HelperWASD.addUserToBL(text);
    });
    blacklistAddUser.addEventListener("keyup", (event) => {
      if (event.key !== "Enter") return;
      text = blacklistAddUser.value;
      HelperWASD.addUserToBL(text);
    });

    blacklistAddTermBtn.addEventListener("click", () => {
      text = blacklistAddTerm.value;
      if (text != "") HelperWASD.addTermToBL(text);
    });
    blacklistAddTerm.addEventListener("keyup", (event) => {
      if (event.key !== "Enter") return;
      text = blacklistAddTerm.value;
      HelperWASD.addTermToBL(text);
    });

    highlightAddUserBtn.addEventListener("click", () => {
      text = highlightAddUser.value;
      if (text != "") HelperWASD.addUserToHL(text);
    });
    highlightAddUser.addEventListener("keyup", (event) => {
      if (event.key !== "Enter") return;
      text = highlightAddUser.value;
      HelperWASD.addUserToHL(text);
    });

    highlightAddTermBtn.addEventListener("click", () => {
      text = highlightAddTerm.value;
      if (text != "") HelperWASD.addTermToHL(text);
    });
    highlightAddTerm.addEventListener("keyup", (event) => {
      if (event.key !== "Enter") return;
      text = highlightAddTerm.value;
      HelperWASD.addTermToHL(text);
    });

    for (let user of Object.keys(settings.list.blockUserList)) {
      HelperWASD.addUserToBlackList(user);
    }
    for (let term of Object.keys(settings.list.blockTermList)) {
      HelperWASD.addTermToBlackList(term);
    }
    for (let user of Object.keys(settings.list.highlightUserList)) {
      HelperWASD.addUserToHighLight(user);
    }
    for (let term of Object.keys(settings.list.highlightTermList)) {
      HelperWASD.addTermToHighLight(term);
    }

    // bind close settings
    settingsDiv.querySelector(".close").addEventListener("click", () => {
      Helper.hideSettings();
      let search = document.querySelector("#settingsSearch");
      if (search) {
        search.value = "";
        search?.dispatchEvent(new Event("input"));
      }
    });

    // bind update chat
    settingsDiv.querySelector(".update").addEventListener("dblclick", () => {
      let header_block_menu = document.querySelectorAll(".header div.header__item");
      if (header_block_menu.length >= 1) {
        header_block_menu[1]?.click();
        settingsDiv.querySelector(".update > i").classList.add("resetPlayerLoading");
        header_block_menu[0]?.click();
      } else {
        if (settingsDiv.classList.contains("fullscreen")) {
          Helper.trySendMessage({ update_chat: true });
        } else {
          alertify.error(`Чат не найден.`);
        }
      }
    });

    // bind newtab settings
    settingsDiv.querySelector(".newtab")?.addEventListener("click", () => {
      let settings_window = window.open("https://wasd.tv/chat?helper-settings=settings", "_blank", "location=yes,height=500,width=800");
      BetterStreamChat.isSettingsNewWindow = true;
      let timer_settings_window = setInterval(() => {
        if (settings_window.closed) {
          clearInterval(timer_settings_window);
          BetterStreamChat.isSettingsNewWindow = false;
        }
      }, 200);
      window.onunload = () => {
        settings_window?.close();
      };
      settingsDiv.querySelector(".close").click();
    });

    // bind update emotes
    settingsDiv.querySelector(".updateemotes").addEventListener("dblclick", () => {
      settingsDiv.querySelector(".updateemotes > i").classList.add("resetPlayerLoading");
      setTimeout(() => {
        settingsDiv.querySelector(".updateemotes > i").classList.remove("resetPlayerLoading");
      }, 1000);

      if (socket?.channel?.channel) HelperBWASYA.tryAddUser(socket.channel.channel.channel_owner.user_id, socket.channel.channel.channel_owner.user_login);
    });

    document.body.addEventListener("click", () => document.querySelector("#bttv-custom-timeout-contain")?.remove());

    Cookies.remove("BetterWASYA_access_token");
    Cookies.remove("BetterWASYA_twitch_display_name");

    // bind search settings
    let filter1, ul1, options1, title1, titleline1, i1;
    settingsSearch.addEventListener("input", () => {
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
          if (filter1 == "") {
            options1[i1].style.display = "";
          } else {
            options1[i1].style.display = "none";
          }
        }
      }
    });

    // bind search emoji
    let bwasdfilter, bwasdul, bwasdoptions, bwasdtitle, bwasdi;
    bwasdemojiSearch.addEventListener("input", () => {
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

    // backup
    settingsDiv.querySelector(".backup-upload").addEventListener("click", () => settingsDiv.querySelector("#importInput").click());

    settingsDiv.querySelector("input#importInput").onchange = () => {
      let files = settingsDiv.querySelector("input#importInput").files[0];
      let reader = new FileReader();
      reader.onload = processFile(files);
      if (files.name.indexOf(".backup") == files.name.length - 7 || files.name.indexOf(".backup.txt") == files.name.length - 11) {
        reader.readAsText(files);
      } else {
        alertify.warning(`только .backup файлы`, 3);
      }
    };

    processFile = () => {
      return (e) => {
        chrome.storage[storageType].set(JSON.parse(e.target.result), () => {
          location.reload();
          Helper.trySendMessage({ location: "reload" });
          alertify.warning(`Перезагрузка страницы`, 5);
        });
      };
    };

    // show-section-mobile
    settingsDiv.querySelector(".show-section-mobile").addEventListener("click", () => {
      settingsDiv.querySelector("section").classList.toggle("mobile-show");
      settingsDiv.querySelector(".show-section-mobile").classList.toggle("active");
    });

    /************/

    settingsDiv.ondragenter = (e) => {
      e.preventDefault();
    };
    settingsDiv.ondragover = (e) => {
      e.preventDefault();
      settingsDiv.classList.add("dragoverbackup");
    };
    settingsDiv.ondragleave = (e) => {
      e.preventDefault();
      settingsDiv.classList.remove("dragoverbackup");
    };
    settingsDiv.ondrop = (e) => {
      e.preventDefault();
      settingsDiv.classList.remove("dragoverbackup");
    };

    /************/

    settingsDiv.querySelector(".backup-download").addEventListener("click", () => HelperWASD.download(`BetterWASYA-settings.backup`, JSON.stringify(settings)));

    settingsDiv.querySelector(".backup-reset").addEventListener("dblclick", () => {
      chrome.storage[storageType].set(Helper.getDefaultSettings(), () => {
        location.reload();
        Helper.trySendMessage({ location: "reload" });
      });
    });

    // link to navigation
    for (let link of settingsDiv.querySelectorAll(".links_to .link_to")) {
      link.addEventListener("click", ({ target }) => {
        if (target.classList.value == "slider-ovg" || target.classList.value == "optionField") return;

        let tabs = settingsDiv.querySelectorAll("main");
        for (let element of [...tabs]) {
          element.classList.remove("active");
        }

        if (target.getAttribute("data-tab") == "bot") {
          settingsSearchDiv.classList.remove("hidden");
        } else {
          settingsSearchDiv.classList.add("hidden");
        }

        settingsDiv.querySelector(`main[data-tab="${target.dataset.tab}"]`).classList.add("active");
      });
    }

    // navigation old
    for (let navItem of settingsDiv.querySelectorAll("section .items > a")) {
      navItem.addEventListener("click", ({ target }) => {
        if (target.getAttribute("role") !== "tab") return;

        let links = settingsDiv.querySelectorAll("section .items > a");
        let tabs = settingsDiv.querySelectorAll("main");
        for (let element of [...tabs, ...links]) {
          element.classList.remove("active");
        }

        if (target.getAttribute("data-tab") == "wasdSettings") {
          settingsSearchDiv.classList.remove("hidden");
        } else {
          settingsSearchDiv.classList.add("hidden");
        }

        if (target.getAttribute("data-tab") == "about") {
          HelperWASD.startTimerStatData();
        } else {
          HelperWASD.stopTimerStatData();
        }

        target.classList.add("active");
        settingsDiv.querySelector(`main[data-tab="${target.dataset.tab}"]`).classList.add("active");
      });
    }

    // navigation new
    for (let navItem of settingsDiv.querySelectorAll("#nav-sidebar .nav-sidebar__item")) {
      navItem.addEventListener("click", ({ target }) => {
        let links = settingsDiv.querySelectorAll("#nav-sidebar .nav-sidebar__item");
        let tabs = settingsDiv.querySelectorAll("main");
        for (let element of [...tabs]) {
          element.classList.remove("active");
        }
        for (let element of [...links]) {
          element.classList.remove("nav-sidebar__item--active");
        }

        if (target.getAttribute("data-tab") == "wasdSettings") {
          settingsSearchDiv.classList.remove("hidden");
        } else {
          settingsSearchDiv.classList.add("hidden");
        }

        if (target.getAttribute("data-tab") == "about") {
          HelperWASD.startTimerStatData();
        } else {
          HelperWASD.stopTimerStatData();
        }

        target.classList.add("nav-sidebar__item--active");
        settingsDiv.querySelector(`main[data-tab="${target.dataset.tab}"]`).classList.add("active");
      });
    }

    // open nav sidebar
    settingsDiv.querySelector("wasd-nav-sidebar").addEventListener("click", () => {
      if (settingsDiv.querySelector("wasd-nav-sidebar[ovg]").classList.contains("nav-sidebar--expanded")) {
        settingsDiv.querySelector("wasd-nav-sidebar[ovg]").classList.remove("nav-sidebar--expanded");
        settingsDiv.querySelector(".open-nav-sidebar").classList.remove("nav-sidebar-toggle--active");
      }
    });
    settingsDiv.querySelector(".open-nav-sidebar").addEventListener("click", () => {
      settingsDiv.querySelector("wasd-nav-sidebar[ovg]").classList.toggle("nav-sidebar--expanded");
      settingsDiv.querySelector(".open-nav-sidebar").classList.toggle("nav-sidebar-toggle--active");
    });

    // goToObsChatSetting2.addEventListener("click", () => {
    //   Helper.trySendMessage({
    //     createWindow: `https://ovgamesdev.github.io/BetterWASYA.obs_chat/settings/?channel_name=${HelperWASD.self_channel_name}&private_link=${HelperWASD.closedViewUrl}`,
    //   });
    // });
    // goToObsChatSetting.addEventListener("click", () => {
    //   Helper.trySendMessage({
    //     createWindow: `https://ovgamesdev.github.io/BetterWASYA.obs_chat/settings/?channel_name=${HelperWASD.self_channel_name}&private_link=${HelperWASD.closedViewUrl}`,
    //   });
    // });

    settingsDiv.querySelector(".ovg-tabs-wrapper").addEventListener("click", () => {
      settingsDiv.querySelector(".show-section-mobile")?.click();
    });

    // to def
    for (let option of settingsDiv.querySelectorAll(".optionField.def")) {
      option.addEventListener("click", (event) => {
        let split = event.target.dataset.name.split("_");
        switch (event.target.getAttribute("option-type")) {
          // case 'boolean':
          //     event.target.parentElement.querySelector(`input[id=boolean_${event.target.getAttribute('data-name')}]`).checked = Helper.getDefaultSettings()[split[0]][split[1]]
          //     HelperSettings.save([event.target.parentElement.querySelector('input[type="checkbox"]')])
          //     break;
          // case 'text':
          //     event.target.parentElement.querySelector('input[type="text"]').value = Helper.getDefaultSettings()[split[0]][split[1]]
          //     HelperSettings.save([event.target.parentElement.querySelector('input[type="text"]')])
          //     break;
          case "number":
            event.target.parentElement.querySelector('input[type="number"]').value = Helper.getDefaultSettings()[split[0]][split[1]];
            event.target.parentElement.querySelector('input[type="number"]').dispatchEvent(new Event("change"));
            break;
          case "select":
            event.target.parentElement.querySelector("select").value = Helper.getDefaultSettings()[split[0]][split[1]];
            event.target.parentElement.querySelector("select").dispatchEvent(new Event("change"));
            break;
          case "color":
            let defVal = Helper.varColorToColor(Helper.getDefaultSettings()[split[0]][split[1]]);
            event.target.parentElement.querySelector("input[data-coloris]").value = defVal;
            event.target.parentElement.style.color = defVal;
            event.target.parentElement.querySelector("input[data-coloris]").dispatchEvent(new Event("change"));
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
            ovg.log("def");
            break;
        }
      });
    }

    for (let option of settingsDiv.querySelectorAll(".optionField")) {
      option.addEventListener("contextmenu", (event) => {
        let split = event.target.dataset.name.split("_");
        switch (event.target.getAttribute("option-type")) {
          // case 'boolean':
          //     event.target.parentElement.querySelector(`input[id=boolean_${event.target.getAttribute('data-name')}]`).checked = Helper.getDefaultSettings()[split[0]][split[1]]
          //     HelperSettings.save([event.target.parentElement.querySelector('input[type="checkbox"]')])
          //     break;
          // case 'text':
          //     event.target.parentElement.querySelector('input[type="text"]').value = Helper.getDefaultSettings()[split[0]][split[1]]
          //     HelperSettings.save([event.target.parentElement.querySelector('input[type="text"]')])
          //     break;
          case "number":
            event.target.parentElement.querySelector('input[type="number"]').value = Helper.getDefaultSettings()[split[0]][split[1]];
            event.target.parentElement.querySelector('input[type="number"]').dispatchEvent(new Event("change"));
            break;
          case "select":
            event.target.parentElement.querySelector("select").value = Helper.getDefaultSettings()[split[0]][split[1]];
            event.target.parentElement.querySelector("select").dispatchEvent(new Event("change"));
            break;
          case "color":
            let defVal = Helper.varColorToColor(Helper.getDefaultSettings()[split[0]][split[1]]);
            event.target.parentElement.querySelector("input[data-coloris]").value = defVal;
            event.target.parentElement.style.color = defVal;
            event.target.parentElement.querySelector("input[data-coloris]").dispatchEvent(new Event("change"));
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
            ovg.log("def");
            break;
        }
        event.preventDefault();
      });
    }

    // change event
    for (let option of settingsDiv.querySelectorAll(".optionField")) {
      option.addEventListener("change", (event) => {
        HelperSettings.save([event.target]);

        if (option.type === "radio" && option.classList.contains("botevent")) {
          value = option.checked && option.value === "1";
        } else if (option.type === "text" && option.classList.contains("botevent")) {
          value = option.value;
        } else if (option.type === "radio") {
          value = option.checked && option.value === "1";
        } else if (option.type === "checkbox") {
          value = option.checked;
        } else if (option.dataset.type === "number" || option.type === "number") {
          value = parseFloat(option.value);
        } else {
          value = option.value;
        }
      });
    }

    $("#blacklistAddUser").autocomplete({
      source: (request, response) => {
        $.ajax({
          url: `https://wasd.tv/api/search/profiles?limit=5&offset=0&search_phrase=${blacklistAddUser.value.toLowerCase()}`,
          success: (data) => {
            response(
              $.map(data?.result?.rows, (item) => ({
                label: item.user_login,
                value: item.user_login,
                logo: item.profile_image.small,
              }))
            );
          },
        });
      },
    });

    $("#highlightAddUser").autocomplete({
      source: (request, response) => {
        $.ajax({
          url: `https://wasd.tv/api/search/profiles?limit=5&offset=0&search_phrase=${highlightAddUser.value.toLowerCase()}`,
          success: (data) => {
            response(
              $.map(data?.result?.rows, (item) => ({
                label: item.user_login,
                value: item.user_login,
                logo: item.profile_image.small,
              }))
            );
          },
        });
      },
    });

    // bind wasd-input
    for (let wasdinput of settingsDiv.querySelectorAll("wasd-input")) {
      let label = wasdinput.querySelector("label[ovg]");
      let input = wasdinput.querySelector("input[ovg]");
      let text = input?.placeholder;
      if (label) label.textContent = text;
      wasdinput.querySelector("input")?.addEventListener("focus", () => {
        label?.classList.add("show");
        input.placeholder = "";
      });
      wasdinput.querySelector("input")?.addEventListener("blur", () => {
        label?.classList.remove("show");
        input.placeholder = text;
      });
      wasdinput.querySelector("button")?.addEventListener("click", () => {
        input.value = "";
        input.dispatchEvent(new Event("input"));
      });
    }

    // bind Тестовое уведомление
    testNotify.addEventListener("click", () => {
      Helper.notify(`Тест`, `Тестовое уведомление`, "test");
    });

    // bind Уведомления
    let isOpenBell = false;
    let bell__info = ovg_bell__element.querySelector(".bell__info");
    let bell_button = ovg_bell__element.querySelector(".bell_button");
    document.body.addEventListener("click", (e) => {
      if (e && e.target && e.target.className && !e.target.className.match("bell") && isOpenBell) {
        Helper.setNotifyReaded();
        bell__info.setAttribute("hidden", "");
        isOpenBell = false;
      }
      if (e && e.target && e.target.className && e.target.className.match("bell__icon") && isOpenBell) {
        setTimeout(() => {
          Helper.setNotifyReaded();
          bell__info.setAttribute("hidden", "");
          isOpenBell = false;
        }, 50);
      }
    });
    bell_button.addEventListener("click", () => {
      setTimeout(() => {
        bell__info.removeAttribute("hidden");
        bell__info.querySelector(".bell-info__list").scrollTop = 0;
        isOpenBell = true;
      }, 50);
    });

    let tooltips = settingsDiv.querySelectorAll(".tooltip-wrapper");
    for (let tooltip of tooltips) {
      $(tooltip).tooltip({
        classes: { "ui-tooltip": "ui-ovg-tooltip" },
        content: tooltip.title,
        show: false,
        hide: false,
        position: {
          my: "center bottom",
          at: "center top-5",
          within: $("#bscSettingsPanel"),
        },
      });
    }

    for (let select of settingsDiv.querySelectorAll("select")) {
      select.onfocus = (e) => e.target.classList.add("active");
      select.onblur = (e) => e.target.classList.remove("active");

      select.onchange = (e) => e.target.blur();
    }

    for (let option of document.querySelectorAll("input[data-coloris]")) {
      if (!option.dataset.name) continue;
      let split = option.dataset.name.split("_");

      let swatches = HelperSettings.availableSettings[split[0]][split[1]].swatches;
      option.addEventListener("focus", () => {
        if (typeof swatches === "object") {
          Coloris({
            swatches: [option.value, ...swatches],
            focusInput: window.innerWidth > 480,
          });
        } else {
          Coloris({
            swatches: [option.value],
            focusInput: window.innerWidth > 480,
          });
        }
      });
    }

    Coloris({ clearButton: { show: false }, formatToggle: false });
    settingsDiv.querySelectorAll("main").forEach((e) => (e.onscroll = () => Coloris.close()));

    this.install();

    // load bwasd emotes
    await HelperBWASYA.update();
    HelperBWASYA.loaded();

    // load chat
    HelperWASD.loaded();
  },
  install() {
    this.activeInstance = "wasd";
    wasd.init();
  },
  uninstall() {
    wasd.uninstall();
    this.activeInstance = null;
  },
  update() {
    if (this.activeInstance) {
      wasd.updatestyle();
      $(".blacklist .user .ovg-items").empty();
      for (let user of Object.keys(settings.list.blockUserList)) {
        HelperWASD.addUserToBlackList(user);
      }

      $(".blacklist .term .ovg-items").empty();
      for (let term of Object.keys(settings.list.blockTermList)) {
        HelperWASD.addTermToBlackList(term);
      }

      $(".highlight .user .ovg-items").empty();
      for (let user of Object.keys(settings.list.highlightUserList)) {
        HelperWASD.addUserToHighLight(user);
      }

      $(".highlight .term .ovg-items").empty();
      for (let term of Object.keys(settings.list.highlightTermList)) {
        HelperWASD.addTermToHighLight(term);
      }
    }
  },
  openSettings() {
    if (HelperWASD.closedViewUrl == "none" || HelperWASD.self_channel_name == "none") {
      $.ajax({
        url: `https://wasd.tv/api/v2/profiles/current/broadcasts/closed-view-url`,
        success: (out) => {
          HelperWASD.closedViewUrl = out.result.view_url.replace("https://wasd.tv/private-stream/", "");
          $.ajax({
            url: `https://wasd.tv/api/v2/profiles/current`,
            success: (out) => {
              HelperWASD.self_channel_name = out.result.user_profile.user_login;
            },
          });
        },
      });
    }

    Helper.buildBell();

    if (document.querySelector('main.active[data-tab="about"]')) {
      HelperWASD.startTimerStatData();
    }
  },
};

$.widget("app.autocomplete", $.ui.autocomplete, {
  _renderItem: (ul, item) => {
    return $("<li>").append(`<div class='ui-menu-item-icon' style='background-image: url(${item.logo})'> ${item.label} </div>`).appendTo(ul);
  },
});
