import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();
async function main(){
  const store=await prisma.store.upsert({where:{id:'seed-store'},update:{},create:{id:'seed-store',name:'Adega Demo SP'}});
  const hash=await bcrypt.hash('123456',10);
  for (const [name,email,role] of [['Administrador','admin@adega.com','admin'],['Gerente','gerente@adega.com','manager'],['Caixa','caixa@adega.com','cashier']] as const){
    await prisma.user.upsert({where:{email},update:{},create:{name,email,role,passwordHash:hash}});
  }
  const catNames=['Gin','Whisky','Vodka','Chanceler','Energéticos','Refrigerantes','Gelo','Copões','Combos','Condimentos','Cervejas'];
  for(const name of catNames){await prisma.category.upsert({where:{storeId_name:{storeId:store.id,name}},update:{},create:{storeId:store.id,name}})}
}
main().finally(()=>prisma.$disconnect());
