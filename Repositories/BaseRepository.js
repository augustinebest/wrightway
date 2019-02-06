// Creating a constructor for base repository
function BaseRepository(model) {
    if(!model) throw new Error('A model must be provided');
    this.model = model;
}

BaseRepository.prototype.add = function(data, callback) {
    this.model.create(data, callback);
}

BaseRepository.prototype.get = function(options, callback) {
    this.model.find(options, callback);
}

BaseRepository.prototype.findById = function(options, callback) {
    this.model.find({_id: options}, callback);
}

BaseRepository.prototype.getByIdNo = function(options, callback) {
    this.model.findOne({idNo: options}, callback);
}

BaseRepository.prototype.getById = function(options, callback) {
    this.model.findOne({_id: options}, callback);
}

BaseRepository.prototype.getByIdNoAndPopulate = function(options, value1, value2, callback) {
    this.model.findOne({idNo: options}).populate(value1).select(value2).exec(callback);
}

module.exports = (model) => {
    return new BaseRepository(model);
}