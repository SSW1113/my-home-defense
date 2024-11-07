export const towerAttackHandler = async ({ data, socket }) => {
  try {
    const { towerId, monsterId } = data;

    const responseData = {
        success: true,
        message: `${towerId}타워가 ${monsterId}몬스터 공격`,
        
    }
  } catch (e) {
    console.error('Tower attack handler error: ', e);
  }
};
