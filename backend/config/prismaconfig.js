import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
// module.exports = {
//     client: {
//       // Specify the correct client engine type here
//       engineType: 'library', // or 'binary'
//       // Other configurations...
//     },
//     // Other configurations...
//   };
export {prisma}