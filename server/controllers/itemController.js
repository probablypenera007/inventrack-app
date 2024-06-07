const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getItems = async (req, res, next) => {
  try {
    const items = await prisma.item.findMany();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};

const addItem = async (req, res, next) => {
  let { itemID, name, quantity, price } = req.body;
  
  try {
    // If itemID is not provided, generate it
    if (!itemID) {
      const lastItem = await prisma.item.findFirst({
        orderBy: {
          id: 'desc',
        },
      });

      itemID = 'Cmp1001';
      if (lastItem) {
        const lastItemID = parseInt(lastItem.itemID.replace('Cmp', ''), 10);
        itemID = isNaN(lastItemID) ? 'Cmp1001' : `Cmp${lastItemID + 1}`;
      }
    } else {
      // Ensure itemID starts with 'Cmp' if the user did not provide it
      if (!itemID.startsWith('Cmp')) {
        itemID = `Cmp${itemID}`;
      }
    }
    // Check if the provided itemID already exists
    const existingItem = await prisma.item.findUnique({
      where: { itemID },
    });

    if (existingItem) {
      return res.status(400).json({ error: 'Item ID already exists' });
    }

    const item = await prisma.item.create({
      data: { itemID, name, quantity, price },
    });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};

const updateItem = async (req, res, next) => {
  const { id } = req.params;
  let { itemID, name, quantity, price } = req.body;

  try {
    // Ensure itemID starts with 'Cmp'
    if (!itemID.startsWith('Cmp')) {
      itemID = `Cmp${itemID}`;
    }

    // Check if the provided itemID already exists and it's not the current item
    const existingItem = await prisma.item.findUnique({
      where: { itemID },
    });

    if (existingItem && existingItem.id !== parseInt(id)) {
      return res.status(400).json({ error: 'Item ID already exists' });
    }

    const item = await prisma.item.update({
      where: { id: parseInt(id) },
      data: { itemID, name, quantity, price },
    });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};

const deleteItem = async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.item.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};

module.exports = {
  getItems,
  addItem,
  updateItem,
  deleteItem,
};
