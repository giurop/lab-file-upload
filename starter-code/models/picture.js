const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const picSchema = new Schema ({
  name: String,
  path: String,
  originalName: String,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

const Picture = mongoose.model('Picture', picSchema);

module.exports = Picture;
