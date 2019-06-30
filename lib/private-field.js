class PrivateField extends WeakMap {
    register(receiver, value) {
        if (super.has(receiver)) {
            throw new TypeError('Attempted to register private field already registered.');
        }
        super.set(receiver, value);
    }

    get(receiver) {
        if (!super.has(receiver)) {
            throw new TypeError('Attempted to get private field on non-instance.');
        }
        return super.get(receiver);
    }
};

module.exports = {
    source: new PrivateField(),
    filter: new PrivateField(),
};
