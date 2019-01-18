module.exports = function(session) {
    session.cart = session.cart || {};
    const cart = session.cart;

    const getItems = () => {
        const items = Object.keys(cart).map(id => ({
            count: cart[id],
            item: require('./items').find(i => i.id === +id),
        }));

        items.forEach(i => (i.subtotal = (i.count * i.item.price).toFixed(2)));

        return items;
    };
    const add = newItem => {
        if (newItem) {
            const id = newItem.id;
            const count = newItem.count;
            cart[id] = session.cart[id] ? session.cart[id] + count : count;
        }
    };

    const ammend = ammendedItem => {
        if (ammendedItem) {
            const id = ammendedItem.id;
            const count = ammendedItem.count;
            cart[id] = count;
        }
    };

    const remove = itemID => {
        console.log('ID',cart[itemID]);
        if (itemID) {
            console.log(delete cart[itemID]); 
        }
        console.log(cart);
    };

    return { add, getItems, ammend, remove };
};
