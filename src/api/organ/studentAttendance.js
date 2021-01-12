//班级名称递归
export function classNameRecursion(params, i = 1) {
  var classObjArray = []
  params.forEach(el => {
    var classObj = {}
    classObj.text = el.label
    classObj.id = el.id
    if (el.hasChildren) {
      classObj.children = classNameRecursion(el.children, i + 1)
    } else {
      if (i < 3) {
        classObj.children = ([{ label: '', hasChildren: false }], i + 1)
      }
    }
    classObjArray.push(classObj);
  });
  return classObjArray
}