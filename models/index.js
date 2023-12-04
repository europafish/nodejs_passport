const mongoose = require('mongoose');
const PostSchema = require('./schemas/post');
const UserSchema = require('./schemas/user');

const Post = mongoose.model('Post', PostSchema);

Post.getPaginatedPosts = async (query, page, perPage) => {
    const [total, posts] = await Promise.all([
      Post.countDocuments(query),
      Post.find(query)
        .sort({ createdAt: -1 })
        .skip(perPage * (page - 1))
        .limit(perPage) // populate 추가하기
        .populate('author'),
    ]);
  
    const totalPage = Math.ceil(total / perPage);
  
    return [posts, totalPage];
  };

exports.Post = Post; 
exports.User = mongoose.model('User', UserSchema);