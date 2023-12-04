const express = require('express');
const router = express.Router();
const asyncHandler = require('../utils/async-handler');


const { Post, User } = require('../models');

/* GET users listing. */
router.get('/', async(req, res, next)=>{
  if(req.query.write){
    res.render('post/edit'); return;
  }
  const page = Number(req.query.page  || 1);
  const perPage = Number(req.query.perPage || 10);

  const [total, posts] = await Promise.all([
    Post.countDocuments({}),
    Post.find({})
    .sort({createdAt: -1})
    .skip(perPage * (page - 1))
    .limit(perPage)
  ]);
  const totalPage = Math.ceil(total / perPage);
//  const posts = await Post.find({});
  res.render('post/list', {posts, page, perPage, totalPage,
  path: req.baseUrl});

});

router.get('/:shortId', asyncHandler(async(req,res)=>{
  const {shortId} = req.params;
  const post = await Post.findOne({shortId}).populate('author');
  if(req.query.edit){
    res.render('post/edit', {post});
    return;
  }
  res.render('post/view', { post });
}));

router.post('/', async(req, res, next)=>{
  const {title, content} = req.body;
  try{
    if(!title || !content){
      throw new Error('제목과 내용을 입력해 주세요.')
    }
    const author = await User.findOne({shortId: req.user.shortId});
    
    if(!author){
      throw new Error('no author');
    }

    const post = await Post.create({
      title, content, author
    })
    res.redirect(`/posts/${post.shortId}`);
  }catch(err){
    next(err);
  }

});

router.post('/:shortId', async(req,res,next)=>{
  const {shortId} = req.params;
  const { title, content } = req.body;
  
  try{
    if(!title || !content){
      throw new Error('제목과 내용을 입력해 주세요.')
    }

    const post = await Post.findOne({shortId}).populate('author');
    if(post.author.shortId !== req.user.shortId){
      throw new Error('작성자가 아닙니다.'); 
    }

    await Post.updateOne({shortId},
      {title,content}
    );
    res.redirect(`/posts/${shortId}`);

  }catch(err){
    next(err);
  }
});

router.delete('/:shortId', async (req, res, next) => {
  const { shortId } = req.params;
  const post = await Post.findOne({shortId}).populate('author');
  if(post.author.shortId !== req.user.shortId){
    throw new Error('작성자가 아닙니다.'); 
  }
  // shortId 로 게시글 삭제
  await Post.deleteOne({ shortId });

  res.send('OK');
});

module.exports = router;
