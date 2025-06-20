const express = require('express');
const router = express.Router();
const { 
    getNewWeekMovies, 
    createMovieController,
    createSportsEvent,
    getMovieById, 
    updateMovie, 
    deleteMovie,
    getMovieStats,
    searchMovies,
    getMovieDetailWithInteractions
} = require('../controllers/movie.controller');

// === PUBLIC ROUTES (Không cần đăng nhập) ===

// Lấy danh sách phim mới - ai cũng xem được
router.get('/new-week', getNewWeekMovies);

// Tìm kiếm phim
router.get('/search', searchMovies);

// Lấy chi tiết một phim - ai cũng xem được
router.get('/:id', getMovieById);
// 🆕 Get movie detail with all interactions - Public/Protected (MUST BE BEFORE /:id)
router.get('/:id/detail-with-interactions', getMovieDetailWithInteractions);

// Get movie stats (likes, views, comments) - Public
router.get('/:movie_id/stats', getMovieStats);

// === ADMIN ROUTES (Cần userId) ===

// Tạo phim mới - userId từ body
router.post('/', createMovieController);

// Tạo sự kiện thể thao - userId từ body
router.post('/sports-event', createSportsEvent);

// Cập nhật phim - userId từ body
router.put('/:id', updateMovie);

// Xóa phim - userId từ body
router.delete('/:id', deleteMovie);

module.exports = router;
