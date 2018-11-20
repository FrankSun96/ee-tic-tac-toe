;
(function() {
    const initUser = user => {
        let score = new Map();
        score.set('wins', 0);
        score.set('loses', 0);
        score.set('draws', 0);
        return score;
    }

    const checkScoreBoard = userId => {
        let request = {
            url: 'application/controller/score_board_check.php',
            data: {
                uId: userId,
                username: cookie.get('username')
            }
        };
        ajaxPromise(request)
            .then(res => {
                if (res.match('ERROR') !== null) {
                    let dom = (`<div class="alert alert-warning alert-dismissible fade show" role="alert">
                                        <strong>WARRNING</strong> Opps, something is wrong
                                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                            </button>
                                    </div>`);
                    $('.score-board-error').append(dom);
                } else {
                    let result = res.split(',');
                    $('.win').html(result[0]);
                    $('.lose').html(result[1]);
                    $('.draw').html(result[2]);
                }
            })
    }

    const checkLeaderBoard = () => {
        let request = {
            url: 'application/controller/leader_board_check.php',
        };
        ajaxPromise(request)
            .then(res => {
                if (res.match('ERROR') !== null) {
                    let dom = (`<div class="alert alert-warning alert-dismissible fade show" role="alert">
                                        <strong>WARRNING</strong> Opps, something is wrong
                                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                            </button>
                                    </div>`);
                    $('.leader-board-error').append(dom);
                } else {
                    let games = res.replace(/[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]*/g, '').split(/[\n]/);
                    let board = new Map();
                    for (let game of games) {
                        let item = game.split(',');
                        if (!board.has(item[1])) {
                            let score = initUser();
                            board.set(item[1], score);
                        }
                        if (!board.has(item[2])) {
                            let score = initUser();
                            board.set(item[2], score);
                        }
                        let state = item[3];
                        if (state === '1') {
                            let u1_score = board.get(item[1]);
                            let u1_wins = u1_score.get('wins');
                            u1_score.set('wins', ++u1_wins);
                            let u2_score = board.get(item[2]);
                            let u2_loses = u2_score.get('loses');
                            u2_score.set('loses', ++u2_loses);
                        } else if (state === '2') {
                            let u1_score = board.get(item[1]);
                            let u1_loses = u1_score.get('loses');
                            u1_score.set('loses', ++u1_loses);
                            let u2_score = board.get(item[2]);
                            let u2_wins = u2_score.get('wins');
                            u2_score.set('wins', ++u2_wins);
                        } else if (state === '3') {
                            let u1_score = board.get(item[1]);
                            let u1_draws = u1_score.get('draws');
                            u1_score.set('draws', ++u1_draws);
                            let u2_score = board.get(item[2]);
                            let u2_draws = u2_score.get('draws');
                            u2_score.set('draws', ++u2_draws);
                        }
                    }
                    for (let [name, scores] of board) {
                        let score_w = scores.get('wins');
                        let score_l = scores.get('loses');
                        let score_d = scores.get('draws');
                        let dom = (`<tr>
                                <th scope="row">${name}</th>
                                <td>${score_w}</td>
                                <td>${score_l}</td>
                                <td>${score_d}</td>
                            </tr>`);
                        $('.leader_board > tbody').append(dom);
                    }
                }
            })
    }
    
    const checkCurrentPage = () => {
        let href = window.location.href;
        let score_board_pattern = 'score';
        let leader_board_pattern = 'leader';
        let rooms_pattern = 'rooms';
        if (href.match(score_board_pattern) !== null) {
            let userId = cookie.get('userId');
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
    }

    checkCurrentPage();

})();