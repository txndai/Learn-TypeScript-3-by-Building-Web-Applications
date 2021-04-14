import localForage from 'localforage'
import 'reflect-metadata'
import {classToPlain, plainToClassFromExist, Expose, Type} from 'class-transformer'

enum Genre {
    Horror = "Horror", 
    Fantastic = "Fantastic", 
    Thriller = "Thriller", 
    Romance = "Romance", 
    Fiction = "Fiction"
}

abstract class Media {
    private _identifier: string

    protected constructor(
        private _name: string,
        private _description: string,
        private _pictureLocation: string,
        private _genre: Genre,
        identifier?: string,
    ) {
        if (identifier) {
            this._identifier = identifier
        } else {
            // this is just for the example; for any real project, use 
            // UUIDs instead: https://www.npmjs.com/package/uuid 
            this._identifier = Math.random().toString(36).substr(2,9); 
        }
    }

    @Expose()
    get identifier(): string {
        return this._identifier
    }
    set identifier(identifier: string) { 
        this._identifier = identifier; 
    }

    @Expose()
    get name(): string { 
        return this._name; 
    }
    set name(name: string) { 
        this._name = name; 
    }

    @Expose()
    get description(): string { 
        return this._description; 
    }
    set description(description: string) { 
        this._description = description; 
    } 

    @Expose()
    get pictureLocation(): string { 
        return this._pictureLocation; 
    } 
    set pictureLocation(pictureLocation: string) { 
        this._pictureLocation = pictureLocation; 
    } 

    @Expose()
    get genre(): Genre { 
        return this._genre; 
    } 
    set genre(genre: Genre) { 
        this._genre = genre; 
    }
}

class Book extends Media {
    private _author: string
    private _numberOfPages: number

    constructor(
        name: string, 
        description: string, 
        pictureLocation: string, 
        genre: Genre, 
        author: string, 
        numberOfPages: number, 
        identifier?: string
    ) {
        super(name, description, pictureLocation, genre, identifier)
        this._numberOfPages = numberOfPages; 
        this._author = author;
    }

    @Expose()
    get author(): string { 
        return this._author; 
    } 
    set author(author: string) { 
        this._author = author; 
    } 

    @Expose() 
    @Type(() => Number) 
    get numberOfPages(): number { 
        return this._numberOfPages; 
    } 
    set numberOfPages(numberOfPages: number) { 
        this._numberOfPages = numberOfPages; 
    }
}

class Movie extends Media {
    private _duration: string
    private _director: string

    constructor(
        name: string, 
        description: string, 
        pictureLocation: string, 
        genre: Genre, 
        duration: string, 
        director: string, 
        identifier?: string 
    ) {
        super(name, description, pictureLocation, genre, identifier)
        this._director = director
        this._duration = duration
    }

    @Expose()
    get director(): string { 
        return this._director; 
    } 
    set director(director: string) { 
        this._director = director; 
    } 

    @Expose()
    get duration(): string { 
        return this._duration; 
    } 
    set duration(duration: string) { 
        this._duration = duration; 
    }
}

class MediaCollection<T extends Media> {
    private _identifier: string
    private _name: string = ""
    private _collection: ReadonlyArray<T> = []
    private readonly _type: Function

    constructor(
        type: Function,
        name?: string,
        identifier?: string
    ) {
            this._type = type

            if(name) {
                this._name = name
            }
            if (identifier) {
                this._identifier = identifier
            } else {
                // this is just for the example; for any real project, use 
                // UUIDs instead: https://www.npmjs.com/package/uuid 
                this._identifier = Math.random().toString(36).
                substr(2, 9);
            }
        }

    @Expose()
    get identifier(): string { 
        return this._identifier; 
    } 
    set identifier(identifier: string) { 
        this._identifier = identifier; 
    } 
    
    @Expose()
    get name(): string { 
        return this._name; 
    } 
    set name(name: string) { 
        this._name = name; 
    } 
    
    @Expose() 
    @Type(options => { 
        if(options) { 
            return (options.newObject as MediaCollection<T>)._type; 
        } else { 
            throw new Error("Cannot not determine the type because the options object is null or undefined"); 
        } 
    }) 
    get collection(): ReadonlyArray<T> { 
        return this._collection; 
    } 
    set collection(collection: ReadonlyArray<T>) { 
        this._collection = collection; 
    } 
    
    addMedia(media: Readonly<T>): void { 
        if (media) { 
            this._collection = this._collection.concat(media); 
        } 
    } 
    removeMedia(itemId: string) { 
        if (itemId) { 
            this._collection = this._collection.filter(item => { 
                return item.identifier !== itemId; 
            }); 
        } 
    } 
}

interface MediaService<T extends Media> {
    loadMediaCollection(identifier: string): Promise<MediaCollection<T>>
    saveMediaCollection(collection: Readonly<MediaCollection<T>>): Promise<void>
    getMediaCollectionIdentifiersList(): Promise<string[]>
    removeMediaCollection(identifier: string): Promise<void>
}

// const bookService = new MediaServiceImpl<Book>(Book)
class MediaServiceImpl<T extends Media> implements MediaService<T> { 
    private readonly _store: LocalForage; 
 
    constructor(private _type: Function) { 
        console.log(`Initializing media service for ${_type.name}`); 
    
        // each instance of the media service has its own data store:     https://github.com/localForage/localForage 
        // the initialization options are described here:     https://localforage.github.io/localForage/#settings-api-config 
        this._store = localForage.createInstance({ 
            name: 'mediaMan', 
            version: 1.0, 
            storeName: `media-man-${_type.name}`, // we add the type name to the object store name! 
            description: 'MediaMan data store' 
        }); 
    } 
    
    loadMediaCollection(identifier: string): Promise<MediaCollection<T>> { 
        console.log(`Trying to load media collection with the following identifier: ${identifier}`); 
        return new Promise<MediaCollection<T>>((resolve, reject) => { 
            this._store.getItem(identifier) 
                .then(value => { 
                    console.log("Found the collection: ", value); 
    
                    const retrievedCollection = plainToClassFromExist<MediaCollection<T>, any>(new MediaCollection<T>(this._type), value); 
    
                    console.log("Retrieved collection: ", retrievedCollection); 
                    resolve(retrievedCollection); 
                }) 
                .catch(err => { 
                    reject(err); // let the error through 
                }); 
        });
     } 
    saveMediaCollection(collection: MediaCollection<T>): Promise<void> { 
        // 1
        return new Promise<void>((resolve, reject) => { // 2 
            if (!collection) { // 3 
                reject(new Error("The list cannot be null or undefined!")); 
            } 
     
            console.log(`Saving media collection with the following name ${collection.name}`); 
     
            const serializedVersion = classToPlain(collection, { excludePrefixes: ["_"] }); // 4 
            console.log("Serialized version: ", serializedVersion); 
     
            this._store.setItem(collection.identifier, serializedVersion) 
            // 5 
                .then(value => { // 6 
                    console.log(`Saved the ${collection.name} collection successfully! Saved value: ${value}`); 
                    resolve(); 
                }) 
                .catch(err => { 
                    console.error(`Failed to save the ${collection.name} collection with identifier ${collection.identifier}. Error: ${err}`); 
                    reject(err); 
                }); 
        });
     } 
    getMediaCollectionIdentifiersList(): Promise<string[]> { 
        return new Promise<string[]>((resolve, reject) => { 
            console.log("Retrieving the list of media collection identifiers"); 
            this._store.keys().then(keys => { 
                console.log(`Retrieved the of media collection identifiers: ${keys}`); 
                resolve(keys); 
            }) 
            .catch(err => { 
                console.error(`Failed to retrieve the list of media collection identifiers. Error: ${err}`); 
                reject(err); 
            }) 
        });
      } 
    removeMediaCollection(identifier: string): Promise<void> { 
        return new Promise<void>((resolve, reject) => { 
            if (!identifier || '' === identifier.trim()) { 
                reject(new Error("The identifier must be provided!")); 
            } 
            console.log(`Removing media collection with the following identifier ${identifier}`); 
        
            this._store.removeItem(identifier) 
                .then(() => { 
                    console.log(`Removed the ${identifier} collection successfully!`); 
                    resolve(); 
                }) 
                .catch(err => { 
                    console.error(`Failed to removed the ${identifier} collection`); 
                    reject(err); 
                }); 
        }); 
    } 
} 