export function calcfoodWeight(peopleName, foods, peopleNameNum) {
  foods.forEach(_el => {
    if (_el.isLock == 0) {
      _el.children.forEach(__el => {
        if (__el.peopleName == peopleName) {
          __el.stockSumVal = __el.stockVal * peopleNameNum
        }
      })
      _el.stockSumVal = 0
      _el.children.forEach(__el => {
        _el.stockSumVal += __el.stockSumVal
      })
      _el.stockVal = _el.stockSumVal / (1000 * _el.unitVal)
    }
  });
}
export function spareNumChange(spareNum, shopListData) {
  shopListData.forEach(_el => {
    _el.peopleStrs.forEach(__el => {
      if (__el.peopleName == "备用") {
        __el.peopleNum = spareNum;
        __el.finalNum = __el.peopleNum - __el.dayOffNum;
      }
    })
  });
}
export function shopPrintData(shopList) {
}