$(function () {
  var layer = layui.layer
  var form = layui.form
  initArtCateList()
  //初始化列表信息
  function initArtCateList() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('请求失败')
        }
        var strHtml = template('tpl-table', res)
        $('tbody').html(strHtml)
      }
    })
  }
  // 点击添加按钮
  var index = null
  $('#btn-add').on('click', function () {
    index = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#open_add').html()
    });
  })
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault()
    $.ajax({
      url: '/my/article/addcates',
      method: 'POST',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('新增分类失败！')
        }
        initArtCateList()
        layer.msg('新增分类成功！')
        layer.close(index)
        // input里面的name名写错了,发起请求失败了
      }
    })
  })
  // 点击编辑和删除按钮
  var indexEdit = null
  $('tbody').on('click', '.btn-edit', function () {
    indexEdit = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '修改文章分类',
      content: $('#open_edit').html()
    });
    var id = $(this).attr('data-id')
    // console.log('这是' + id);
    $.ajax({
      method: 'GET',
      url: '/my/article/cates/' + id,
      success: function (res) {
        form.val('form-edit', res.data)
        // console.log(res.data);
        // form.val()自动给表单匹配元素要和lay-filter="form-edit"配合使用
      }
    })
  })
  $('body').on('submit', '#form-edit', function (e) {
    e.preventDefault()
    $.ajax({
      url: '/my/article/updatecate',
      method: 'POST',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('更新分类数据失败！')
        }
        layer.msg('更新分类数据成功！')
        layer.close(indexEdit)
        initArtCateList()

      }
    })
  })
  // 删除按钮 
  $('tbody').on('click', '.btn-delete', function () {
    var id = $(this).attr('data-id')
    layer.confirm('是否要删除?', { icon: 3, title: '提示' }, function (index) {
      $.ajax({
        method: 'GET',
        url: '/my/article/deletecate/' + id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg('删除失败！')
          }
          layer.msg('删除分类成功！')
          layer.close(index);
          initArtCateList()
        }
      })

    });
  })
})