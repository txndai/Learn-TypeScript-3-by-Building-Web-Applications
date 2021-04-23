"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var localforage_1 = __importDefault(require("localforage"));
require("reflect-metadata");
var class_transformer_1 = require("class-transformer");
console.log("pun");
var Genre;
(function (Genre) {
    Genre["Horror"] = "Horror";
    Genre["Fantastic"] = "Fantastic";
    Genre["Thriller"] = "Thriller";
    Genre["Romance"] = "Romance";
    Genre["Fiction"] = "Fiction";
})(Genre || (Genre = {}));
var Media = /** @class */ (function () {
    function Media(_name, _description, _pictureLocation, _genre, identifier) {
        this._name = _name;
        this._description = _description;
        this._pictureLocation = _pictureLocation;
        this._genre = _genre;
        if (identifier) {
            this._identifier = identifier;
        }
        else {
            // this is just for the example; for any real project, use 
            // UUIDs instead: https://www.npmjs.com/package/uuid 
            this._identifier = Math.random().toString(36).substr(2, 9);
        }
    }
    Object.defineProperty(Media.prototype, "identifier", {
        get: function () {
            return this._identifier;
        },
        set: function (identifier) {
            this._identifier = identifier;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Media.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (name) {
            this._name = name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Media.prototype, "description", {
        get: function () {
            return this._description;
        },
        set: function (description) {
            this._description = description;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Media.prototype, "pictureLocation", {
        get: function () {
            return this._pictureLocation;
        },
        set: function (pictureLocation) {
            this._pictureLocation = pictureLocation;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Media.prototype, "genre", {
        get: function () {
            return this._genre;
        },
        set: function (genre) {
            this._genre = genre;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        class_transformer_1.Expose()
    ], Media.prototype, "identifier", null);
    __decorate([
        class_transformer_1.Expose()
    ], Media.prototype, "name", null);
    __decorate([
        class_transformer_1.Expose()
    ], Media.prototype, "description", null);
    __decorate([
        class_transformer_1.Expose()
    ], Media.prototype, "pictureLocation", null);
    __decorate([
        class_transformer_1.Expose()
    ], Media.prototype, "genre", null);
    return Media;
}());
var Book = /** @class */ (function (_super) {
    __extends(Book, _super);
    function Book(name, description, pictureLocation, genre, author, numberOfPages, identifier) {
        var _this = _super.call(this, name, description, pictureLocation, genre, identifier) || this;
        _this._numberOfPages = numberOfPages;
        _this._author = author;
        return _this;
    }
    Object.defineProperty(Book.prototype, "author", {
        get: function () {
            return this._author;
        },
        set: function (author) {
            this._author = author;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Book.prototype, "numberOfPages", {
        get: function () {
            return this._numberOfPages;
        },
        set: function (numberOfPages) {
            this._numberOfPages = numberOfPages;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        class_transformer_1.Expose()
    ], Book.prototype, "author", null);
    __decorate([
        class_transformer_1.Expose(),
        class_transformer_1.Type(function () { return Number; })
    ], Book.prototype, "numberOfPages", null);
    return Book;
}(Media));
var Movie = /** @class */ (function (_super) {
    __extends(Movie, _super);
    function Movie(name, description, pictureLocation, genre, duration, director, identifier) {
        var _this = _super.call(this, name, description, pictureLocation, genre, identifier) || this;
        _this._director = director;
        _this._duration = duration;
        return _this;
    }
    Object.defineProperty(Movie.prototype, "director", {
        get: function () {
            return this._director;
        },
        set: function (director) {
            this._director = director;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Movie.prototype, "duration", {
        get: function () {
            return this._duration;
        },
        set: function (duration) {
            this._duration = duration;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        class_transformer_1.Expose()
    ], Movie.prototype, "director", null);
    __decorate([
        class_transformer_1.Expose()
    ], Movie.prototype, "duration", null);
    return Movie;
}(Media));
var MediaCollection = /** @class */ (function () {
    function MediaCollection(type, name, identifier) {
        this._name = "";
        this._collection = [];
        this._type = type;
        if (name) {
            this._name = name;
        }
        if (identifier) {
            this._identifier = identifier;
        }
        else {
            // this is just for the example; for any real project, use 
            // UUIDs instead: https://www.npmjs.com/package/uuid 
            this._identifier = Math.random().toString(36).
                substr(2, 9);
        }
    }
    Object.defineProperty(MediaCollection.prototype, "identifier", {
        get: function () {
            return this._identifier;
        },
        set: function (identifier) {
            this._identifier = identifier;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MediaCollection.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (name) {
            this._name = name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MediaCollection.prototype, "collection", {
        get: function () {
            return this._collection;
        },
        set: function (collection) {
            this._collection = collection;
        },
        enumerable: false,
        configurable: true
    });
    MediaCollection.prototype.addMedia = function (media) {
        if (media) {
            this._collection = this._collection.concat(media);
        }
    };
    MediaCollection.prototype.removeMedia = function (itemId) {
        if (itemId) {
            this._collection = this._collection.filter(function (item) {
                return item.identifier !== itemId;
            });
        }
    };
    __decorate([
        class_transformer_1.Expose()
    ], MediaCollection.prototype, "identifier", null);
    __decorate([
        class_transformer_1.Expose()
    ], MediaCollection.prototype, "name", null);
    __decorate([
        class_transformer_1.Expose(),
        class_transformer_1.Type(function (options) {
            if (options) {
                return options.newObject._type;
            }
            else {
                throw new Error("Cannot not determine the type because the options object is null or undefined");
            }
        })
    ], MediaCollection.prototype, "collection", null);
    return MediaCollection;
}());
// const bookService = new MediaServiceImpl<Book>(Book)
var MediaServiceImpl = /** @class */ (function () {
    function MediaServiceImpl(_type) {
        this._type = _type;
        console.log("Initializing media service for " + _type.name);
        // each instance of the media service has its own data store:     https://github.com/localForage/localForage 
        // the initialization options are described here:     https://localforage.github.io/localForage/#settings-api-config 
        this._store = localforage_1.default.createInstance({
            name: 'mediaMan',
            version: 1.0,
            storeName: "media-man-" + _type.name,
            description: 'MediaMan data store'
        });
    }
    MediaServiceImpl.prototype.loadMediaCollection = function (identifier) {
        var _this = this;
        console.log("Trying to load media collection with the following identifier: " + identifier);
        return new Promise(function (resolve, reject) {
            _this._store.getItem(identifier)
                .then(function (value) {
                console.log("Found the collection: ", value);
                var retrievedCollection = class_transformer_1.plainToClassFromExist(new MediaCollection(_this._type), value);
                console.log("Retrieved collection: ", retrievedCollection);
                resolve(retrievedCollection);
            })
                .catch(function (err) {
                reject(err); // let the error through 
            });
        });
    };
    MediaServiceImpl.prototype.saveMediaCollection = function (collection) {
        var _this = this;
        // 1
        return new Promise(function (resolve, reject) {
            if (!collection) { // 3 
                reject(new Error("The list cannot be null or undefined!"));
            }
            console.log("Saving media collection with the following name " + collection.name);
            var serializedVersion = class_transformer_1.classToPlain(collection, { excludePrefixes: ["_"] }); // 4 
            console.log("Serialized version: ", serializedVersion);
            _this._store.setItem(collection.identifier, serializedVersion)
                // 5 
                .then(function (value) {
                console.log("Saved the " + collection.name + " collection successfully! Saved value: " + value);
                resolve();
            })
                .catch(function (err) {
                console.error("Failed to save the " + collection.name + " collection with identifier " + collection.identifier + ". Error: " + err);
                reject(err);
            });
        });
    };
    MediaServiceImpl.prototype.getMediaCollectionIdentifiersList = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log("Retrieving the list of media collection identifiers");
            _this._store.keys().then(function (keys) {
                console.log("Retrieved the of media collection identifiers: " + keys);
                resolve(keys);
            })
                .catch(function (err) {
                console.error("Failed to retrieve the list of media collection identifiers. Error: " + err);
                reject(err);
            });
        });
    };
    MediaServiceImpl.prototype.removeMediaCollection = function (identifier) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!identifier || '' === identifier.trim()) {
                reject(new Error("The identifier must be provided!"));
            }
            console.log("Removing media collection with the following identifier " + identifier);
            _this._store.removeItem(identifier)
                .then(function () {
                console.log("Removed the " + identifier + " collection successfully!");
                resolve();
            })
                .catch(function (err) {
                console.error("Failed to removed the " + identifier + " collection");
                reject(err);
            });
        });
    };
    return MediaServiceImpl;
}());
//# sourceMappingURL=mediaman.js.map