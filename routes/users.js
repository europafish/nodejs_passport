const { Router } = require('express');

const { User, Post } = require('../models');
const asyncHandler = require('../utils/async-handler');

const router = Router();

router.get(
  '/:shortId/posts',
  asyncHandler(async (req, res) => {
    const { shortId } = req.params;
    // 유저 게시글 모아보기 기능 완성하기
    const user = await User.findOne({ shortId });
    if (!user) {
      throw new Error('사용자가 없습니다.');
    }
    const page = Number(req.query.page || 1);
    const perPage = Number(req.query.perPage || 10);

    // getPaginatedPosts 사용하기
    const [posts, totalPage] = await Post.getPaginatedPosts(
      { author: user },
      page,
      perPage,
    );

    res.render('post/list', {
      posts,
      page,
      perPage,
      totalPage,
      user,
      path: req.baseUrl + req.url,
    });
  }),
);

module.exports = router;
