```html
<sc-date-picker :date="date2" width="100%" :option="option2"></sc-date-picker> - 
<sc-date-picker :date="date3" width="100%" :option="option3"></sc-date-picker>
<script>
    import code1 from './code1.md'
    import code2 from './code2.md'
    import code3 from './code3.md'
    import description from './description'
    import dataArray from './dataArray'
    export default {
        data() {
            return {
                code1: code1,
                description1: description.description1,
                code2: code2,
                description2: description.description2,
                code3: code3,
                description3: description.description3,
                dataArray: dataArray,
                width: null,
                date: {
                    time: null
                },
                date1: {
                    time: '2017/12/25'
                },
                date2: {
                    time: null
                },
                date3: {
                    time: null
                },
                option: {
                    format: 'YYYY/MM/DD',
                    SundayFirst: true,
                    limit: [{
                        type: 'weekday',
                        available: [1,2,3, 4, 5,6,7] 
                    },{
                        type: 'fromto',
                        from:'2017/12/10',
                        to:'2017/12/30'
                    }]
                },
       
            }
        },
        computed: {
            option2() {
                return {
                    format: 'YYYY-MM-DD',
                    SundayFirst: true,
                    limit:[{
                        type: 'fromto',
                        to: this.date3.time

                    }]
                }
            },
            option3() {
                return {
                    format: 'YYYY-MM-DD',
                    SundayFirst: true,
                    limit:[{
                        type: 'fromto',
                        from: this.date2.time
                    }]
                }    
            },
        }
    }
</script>
```