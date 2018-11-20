"use strict";

var cookie = {
  set: function set(key, val, time) {
    var date = new Date();
    var expiresDays = time;
    date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000);
    document.cookie = key + "=" + val + ";expires=" + date.toGMTString();
  },
  get: function get(key) {
    var getCookie = document.cookie.replace(/[ ]/g, "");
    var arrCookie = getCookie.split(";");
    var tips;

    for (var i = 0; i < arrCookie.length; i++) {
      var arr = arrCookie[i].split("=");

      if (key == arr[0]) {
        tips = arr[1];
        break;
      }
    }

    return tips;
  },
  delete: function _delete(key) {
    var date = new Date();
    date.setTime(date.getTime() - 10000);
    document.cookie = key + "=v; expires =" + date.toGMTString();
  }
};

var ajaxPromise = function ajaxPromise(param) {
  return new Promise(function (resovle, reject) {
    $.ajax({
      "type": param.type || "post",
      "async": param.async || true,
      "url": param.url,
      "data": param.data || "",
      "success": function success(res) {
        resovle(res);
      },
      "error": function error(err) {
        reject(err);
      }
    });
  });
};
"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

;

(function () {
  var initUser = function initUser(user) {
    var score = new Map();
    score.set('wins', 0);
    score.set('loses', 0);
    score.set('draws', 0);
    return score;
  };

  var checkScoreBoard = function checkScoreBoard(userId) {
    var request = {
      url: 'application/controller/score_board_check.php',
      data: {
        uId: userId,
        username: cookie.get('username')
      }
    };
    ajaxPromise(request).then(function (res) {
      if (res.match('ERROR') !== null) {
        var dom = "<div class=\"alert alert-warning alert-dismissible fade show\" role=\"alert\">\n                                        <strong>WARRNING</strong> Opps, something is wrong\n                                            <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n                                                    <span aria-hidden=\"true\">&times;</span>\n                                            </button>\n                                    </div>";
        $('.score-board-error').append(dom);
      } else {
        var result = res.split(',');
        $('.win').html(result[0]);
        $('.lose').html(result[1]);
        $('.draw').html(result[2]);
      }
    });
  };

  var checkLeaderBoard = function checkLeaderBoard() {
    var request = {
      url: 'application/controller/leader_board_check.php'
    };
    ajaxPromise(request).then(function (res) {
      if (res.match('ERROR') !== null) {
        var dom = "<div class=\"alert alert-warning alert-dismissible fade show\" role=\"alert\">\n                                        <strong>WARRNING</strong> Opps, something is wrong\n                                            <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n                                                    <span aria-hidden=\"true\">&times;</span>\n                                            </button>\n                                    </div>";
        $('.leader-board-error').append(dom);
      } else {
        var games = res.replace(/[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]*/g, '').split(/[\n]/);
        var board = new Map();
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = games[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var game = _step.value;
            var item = game.split(',');

            if (!board.has(item[1])) {
              var score = initUser();
              board.set(item[1], score);
            }

            if (!board.has(item[2])) {
              var _score = initUser();

              board.set(item[2], _score);
            }

            var state = item[3];

            if (state === '1') {
              var u1_score = board.get(item[1]);
              var u1_wins = u1_score.get('wins');
              u1_score.set('wins', ++u1_wins);
              var u2_score = board.get(item[2]);
              var u2_loses = u2_score.get('loses');
              u2_score.set('loses', ++u2_loses);
            } else if (state === '2') {
              var _u1_score = board.get(item[1]);

              var u1_loses = _u1_score.get('loses');

              _u1_score.set('loses', ++u1_loses);

              var _u2_score = board.get(item[2]);

              var u2_wins = _u2_score.get('wins');

              _u2_score.set('wins', ++u2_wins);
            } else if (state === '3') {
              var _u1_score2 = board.get(item[1]);

              var u1_draws = _u1_score2.get('draws');

              _u1_score2.set('draws', ++u1_draws);

              var _u2_score2 = board.get(item[2]);

              var u2_draws = _u2_score2.get('draws');

              _u2_score2.set('draws', ++u2_draws);
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = board[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _step2$value = _slicedToArray(_step2.value, 2),
                name = _step2$value[0],
                scores = _step2$value[1];

            var score_w = scores.get('wins');
            var score_l = scores.get('loses');
            var score_d = scores.get('draws');

            var _dom = "<tr>\n                                <th scope=\"row\">".concat(name, "</th>\n                                <td>").concat(score_w, "</td>\n                                <td>").concat(score_l, "</td>\n                                <td>").concat(score_d, "</td>\n                            </tr>");

            $('.leader_board > tbody').append(_dom);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    });
  };

  var checkCurrentPage = function checkCurrentPage() {
    var href = window.location.href;
    var score_board_pattern = 'score';
    var leader_board_pattern = 'leader';
    var rooms_pattern = 'rooms';

    if (href.match(score_board_pattern) !== null) {
      var userId = cookie.get('userId');
      checkScoreBoard(userId);
      $('.score_active').addClass('active').addClass('font-weight-bold');
      $('.leader_active').removeClass('active').removeClass('font-weight-bold');
      $('.rooms_active').removeClass('active').removeClass('font-weight-bold');
    } else if (href.match(leader_board_pattern) !== null) {
      checkLeaderBoard();
      $('.score_active').removeClass('active').removeClass('font-weight-bold');
      $('.leader_active').addClass('active').addClass('font-weight-bold');
      $('.rooms_active').removeClass('active').removeClass('font-weight-bold');
    } else if (href.match(rooms_pattern) !== null) {
      $('.leader_active').removeClass('active').removeClass('font-weight-bold');
      $('.score_active').removeClass('active').removeClass('font-weight-bold');
      $('.rooms_active').addClass('active').addClass('font-weight-bold');
    }
  };

  checkCurrentPage();
})();
"use strict";

;

(function () {
  var checkCurrentPage = function checkCurrentPage() {
    var href = window.location.href;
    var game_pattern = 'game';

    if (href.match(game_pattern) !== null) {
      $('.leader_active').removeClass('active').removeClass('font-weight-bold');
      $('.score_active').removeClass('active').removeClass('font-weight-bold');
      $('.rooms_active').removeClass('active').removeClass('font-weight-bold');
      var gameId = getUrlParam('gameId');
    }
  };

  var getUrlParam = function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  };
})();
"use strict";

;

(function () {
  var checkCurrentPage = function checkCurrentPage() {
    var href = window.location.href;
    var rooms_pattern = 'rooms';

    if (href.match(rooms_pattern) !== null) {
      $('.leader_active').removeClass('active').removeClass('font-weight-bold');
      $('.score_active').removeClass('active').removeClass('font-weight-bold');
      $('.rooms_active').addClass('active').addClass('font-weight-bold');
      initRooms();
    }
  };

  var initRooms = function initRooms() {
    var request = {
      url: 'application/controller/open_games.php'
    };
    ajaxPromise(request).then(function (res) {
      var rooms = res.split(/[\n]/);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = rooms[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var room = _step.value;
          var details = room.split(',');
          var dom = "<div class=\"col-sm-3\">\n\t\t\t            \t\t\t<div class=\"shadow mb-5 bg-white rounded\">\n\t\t\t            \t\t\t\t<div class=\"card bg-light\">\n\t\t\t              \t\t\t\t\t<div class=\"card-body\">\n\t\t\t                \t\t\t\t\t<p class=\"card-text\">Player</p>\n\t\t\t                \t\t\t\t\t<h5 class=\"card-title\">".concat(details[1], "</h5>\n\t\t\t                \t\t\t\t\t<button class=\"join-game btn btn-outline-info\" value=\"").concat(details[0], "\">JOIN</button>\n\t\t\t              \t\t\t\t\t</div>\n\t\t\t            \t\t\t\t</div>\n\t\t\t          \t\t\t\t</div>\n          \t\t\t\t\t\t</div>");
          $('.room-cards').append(dom);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    });
  };

  $('.new-game-btn').on('click', function () {
    var userId = cookie.get('userId');
    var request = {
      url: 'application/controller/new_game.php',
      data: {
        uId: userId
      }
    };
    ajaxPromise(request).then(function (res) {
      if (res.match('ERROR') !== null) {
        var dom = "<div class=\"alert alert-warning alert-dismissible fade show\" role=\"alert\">\n            \t\t\t\t\t\t\t<strong>WARRNING</strong> Unable to start a game!\n            \t\t\t\t\t\t\t\t<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n              \t\t\t\t\t\t\t\t\t\t<span aria-hidden=\"true\">&times;</span>\n            \t\t\t\t\t\t\t\t</button>\n          \t\t\t\t\t\t\t</div>";
        $('.new-game-alert').append(dom);
      } else {
        self.location = "game.php?gameId=".concat(res);
      }
    });
  });
  $(document).ready(function () {
    $('.join-game').on('click', function (event) {
      event = event || window.event;
      var gameId = event.target.value;
      var userId = cookie.get('userId');
      var request = {
        url: 'application/controller/join_game.php',
        data: {
          uId: userId,
          gId: gameId
        }
      };
      ajaxPromise(request).then(function (res) {
        if (res.match('ERROR') !== null || res == 0) {
          console.log(res);
          var dom = "<div class=\"alert alert-warning alert-dismissible fade show\" role=\"alert\">\n            \t\t\t\t\t\t\t<strong>WARRNING</strong> Unable to join the game!\n            \t\t\t\t\t\t\t\t<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n              \t\t\t\t\t\t\t\t\t\t<span aria-hidden=\"true\">&times;</span>\n            \t\t\t\t\t\t\t\t</button>\n          \t\t\t\t\t\t\t</div>";
          $('.new-game-alert').append(dom);
        } else {
          self.location = "game.php?gameId=".concat(gameId);
        }
      });
    });
  });
  checkCurrentPage();
})();
"use strict";

;

(function () {
  var checkCookie = function checkCookie() {
    if (cookie.get('userId') !== undefined) {
      $('.login-allowed').prop('hidden', false);
      $('.login-disappear').prop('hidden', true);
      $('.welcome').html("Hello ".concat(cookie.get('username'), " !"));
    } else {
      $('.login-allowed').prop('hidden', true);
      $('.login-disappear').prop('hidden', false);
      $('.welcome').html('');
    }
  };

  checkCookie();
  $('.login-btn').on('click', function () {
    var error = false;
    var input = $('#login-form :input');
    var u_username = input.eq(0).val();
    var u_password = input.eq(1).val();

    if (u_username === '') {
      $('.login-alert:eq(0)').prop('hidden', false);
      error = true;
    }

    if (u_password === '') {
      $('.login-alert:eq(1)').prop('hidden', false);
      error = true;
    }

    if (error) {
      return false;
    } else {
      var request = {
        url: 'application/controller/login_check.php',
        data: {
          username: u_username,
          password: u_password
        }
      };
      ajaxPromise(request).then(function (res) {
        if (Number(res) === -1 || Number(res) === 0) {
          $('.login-alert:eq(2)').prop('hidden', false);
        } else {
          cookie.set('userId', Number(res), 1);
          cookie.set('username', u_username, 1);
          checkCookie();
          self.location = 'index.php';
        }
      });
    }
  });
  $('.register-btn').on('click', function () {
    var error = false;
    var input = $('#register-form :input');
    var user = {};
    $.each(input, function (key, value) {
      if (key < 4) {
        if (value.value === '') {
          $(".register-alert:eq(".concat(key, ")")).prop('hidden', false);
          error = true;
        } else {
          user[value.name] = value.value;
        }
      }
    });

    if (!error) {
      var request = {
        url: 'application/controller/register_check.php',
        data: user
      };
      ajaxPromise(request).then(function (res) {
        var pattern = '^[A-Za-z]+';
        var matchResult = res.match(pattern);

        if (matchResult === null) {
          cookie.set('userId', res, 1);
          cookie.set('username', user.username, 1);
          checkCookie();
          self.location = 'login.php';
        } else {
          $('.register-warning').html(res).prop('hidden', false);
        }
      });
    }
  });
})();