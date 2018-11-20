;
(function() {
	const checkCurrentPage = () => {
        let href = window.location.href;
        let game_pattern = 'game';
        if (href.match(game_pattern) !== null) {
            $('.leader_active').removeClass('active').removeClass('font-weight-bold');
            $('.score_active').removeClass('active').removeClass('font-weight-bold');
            $('.rooms_active').removeClass('active').removeClass('font-weight-bold');
            let gameId = getUrlParam('gameId');
        }
    }
    const getUrlParam = (name) => {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

})();