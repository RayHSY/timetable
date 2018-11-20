多功能课程表

### 配置参数

#### TimeTable
参数|说明|类型|必填|默认值
-|-|-|-|-
data|数据数组|any[]|yes
groupBy|groupBy关键字,通过这个值生成组合后的表头，不填则为本月所有日期|string
status|控制课程的颜色|object
cells|控制表格每个格子的高度和最小宽度|object

#### data
参数|说明|类型|必填
-|-|-|-
id|唯一标示符|string, number|
courseCategoryName|课程名称|string|yes
startTime|课时开始时间|string|yes
endTime|课时结束时间|string|yes
data|课程日期|string|yes
teacher|老师|string|
classRoom|教室|string
status|课时状态或类型，可以决定课程颜色值|string


#### cells
参数|说明|类型|默认值
-|-|-|-
minWidth|格子最小宽度|number|120
height|格子高度|number|80

#### status示例
```js
  options = {
    status: {
      // 上课状态
      inClass: '#345678',
      // or 课程类型
      math: '#123456',
      english: '##456456'
    }
  }
```

