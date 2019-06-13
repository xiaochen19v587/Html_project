$(function(){
    // 1.全选和取消全选
    $('.checkAll').click(function(){
        // 如果当前元素为选中状态
        if($(this).attr('checked')){
            // 修改为取消选中
            $(this).removeAttr('checked')
                .attr('src','../images/cart/product_normal.png')
            $('.checkItem').removeAttr('checked')
                .attr('src','../images/cart/product_normal.png')
        }else{
            $(this).attr('checked','true')
                .attr('src','../images/cart/product_true.png')
            $('.checkItem').removeAttr('checked')
                .attr('src','../images/cart/product_true.png')
        }
        // 1.为全选按钮添加点击事件,事件函数中判断当前元素是否为选中状态(检查元素是否存在checked属性)
        // 2.如果为选中状态,则更改为未选中状态,将checkItem元素状态也更改为未选中状态(移除checked属性)
        // 3.如果为未选中状态,则更改为选中状态,将checkItem元素状态也更改为选中状态(添加checked属性)
        sumPrice()
    })
    // 2.反选
    $(".checkItem").click(function(){
        if($(this).attr('checked')){
            $(this).removeAttr('checked')
                .attr('src','../images/cart/product_normal.png')
        }else{
            $(this).attr('checked','true')
                .attr('src','../images/cart/product_true.png')
        }
        // 被选中的商品数量等于商品元素的个数,视为全选
        if($('.checkItem[checked]').length == $('.checkItem').length){
            $('.checkAll').attr('checked','true')
                .attr('src','../images/cart/product_true.png')
        }else{
            $('.checkAll').removeAttr('checked','true')
                .attr('src','../images/cart/product_normal.png')
        }
        sumPrice()
    })
    // 3.数量的增减
    $('.add').click(function(){
        // 获取前一个兄弟元素(输入框)的值
        var value=$(this).prev().val()
        value++
        $(this).prev().val(value)
        // 价格的联动 单价*数量,修改总金额
        countPrice($(this),value)
        sumPrice()
    })
    $('.minus').click(function(){
        var value=$(this).next().val()
        if(value>1){
            value--
        }
        $(this).next().val(value)
        countPrice($(this),value)
        sumPrice()
    })
    
    
    // 4.移除操作   
    $('.item .action').click(function(){
        // 移除整个商品记录
        $(this).parents('.item').remove()
        sumPrice()
    })


    function countPrice(that,value){
        var str=that.parents(".item").find(".gprice p").html()
        var price=str.substring(2)
        var sum=price*value
        sum=sum.toFixed(2)
        that.parents('.gcount').next().html('&yen; '+sum)
    }
    
    // 总价格和总数量的联动
    function sumPrice(){
        console.log('s1')
        // 获取被选中的商品,累加商品数量和总价
        var num=0
        var price=0
        // jQuery数据遍历方法 each(function(){})
        $('.checkItem[checked]').each(function(){
            // 每取到一个元素调用当前函数,this指代函数调用者
            var n=$(this).parents('.item').find('.gcount input').val()
            var p=$(this).parents('.item').find('.gsum').html()
            // 转Number
            n=Number(n)
            p=Number(p.substring(2))
            console.log(n)
            console.log(p)
            num += n
            price += p
        })
        price=price.toFixed(2)
        $('.total-num').html(num)
        $('.total-price').html(price)
    }






    
})