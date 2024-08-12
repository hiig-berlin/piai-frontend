class ClassInMemoryCache {
  data: Record<string, any> = {};

  constructor() {
    this.get = this.get.bind(this);

    this.set = this.set.bind(this);

    this.del = this.del.bind(this);

    this.take = this.take.bind(this);
  }

  get(key: string) {
    let err;

    if ((err = this._isInvalidKey(key)) != null) {
      throw err;
    }
    if (this.data[key] != null && this._check(key, this.data[key])) {
      const _ret = this._unwrap(this.data[key]);
      return _ret;
    } else {
      return null;
    }
  }

  set(key: string, value: any, ttl: number = 300) {
    let err;

    if ((err = this._isInvalidKey(key)) != null) {
      throw err;
    }

    this.data[key] = this._wrap(value, ttl);
    return true;
  }

  del(keys: string | string[]) {
    let delCount, err, i, key, len;

    if (!Array.isArray(keys)) {
      keys = [keys];
    }
    delCount = 0;
    for (i = 0, len = keys.length; i < len; i++) {
      key = keys[i];
      // handle invalid key types
      if ((err = this._isInvalidKey(key)) != null) {
        throw err;
      }
      // only delete if existent
      if (this.data[key] != null) {
        delCount++;
        delete this.data[key];
      }
    }
    return delCount;
  }

  take(key: string) {
    const _ret = this.get(key);
    if (_ret != null) {
      this.del(key);
    }
    return _ret;
  }

  keys() {
    const _keys = Object.keys(this.data);
    return _keys;
  }

  has(key: string) {
    const _exists = this.data[key] != null && this._check(key, this.data[key]);
    return _exists;
  }

  flushAll() {
    this.data = {};
  }

  _check(key: string, entry: any) {
    let _retval;

    _retval = true;
    
    if (entry.t !== 0 && entry.t < Date.now()) {
      _retval = false;
      this.del(key);
    }
    return _retval;
  }

  _isInvalidKey(key: string) {
    if (typeof key !== "string") {
      return true;
    }
  }

  _wrap(value: any, ttl: number) {
    return {
      t: ttl !== 0 ? Date.now() + ttl * 1000 : 0,
      v: value,
    };
  }

  _unwrap(value: any) {
    if (value.v != null) {
      return value.v;
    }
    return null;
  }

  // ## _getKeyLength

  // internal method the calculate the key length
  _getKeyLength(key: string) {
    return key.toString().length;
  }
}

export const inMemoryCache = new ClassInMemoryCache();
export default inMemoryCache;