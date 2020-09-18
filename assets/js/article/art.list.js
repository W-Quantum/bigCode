$(function () {
  var layer = layui.layer
  var form = layui.form
  var q = {
    pagenum: 1,
    pagesize: 2,
    cate_id: '',
    state: ''
  }
  initTable()
  // 渲染列表页
  function initTable() {
    $.ajax({
      method: 'GET',
      url: '/my/article/list',
      data: q,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('失败')
        }
        var strHtml = template('tpl-table', res)
        $('tbody').html(strHtml)
        renderPage(res.total)
      }
    })
  }
  // 美化时间过滤器
  template.defaults.imports.dataFormat = function (date) {
    const dt = new Date(date)
    var y = dt.getFullYear()
    var m = padZero(dt.getMonth() + 1)
    var d = padZero(dt.getDate())
    var hh = padZero(dt.getHours())
    var mm = padZero(dt.getMinutes())
    var ss = padZero(dt.getSeconds())

    return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
  }
  // 定义补零的函数
  function padZero(n) {
    return n > 9 ? n : '0' + n
  }
  // 渲染下拉框
  initCate()
  function initCate() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取分类数据失败')
        }
        var strHtml = template('tpl-cate', res)
        $('[name=cate_id]').html(strHtml)
        form.render()
        //因为下拉框有自己的模板格式,而 layui框架机子定义了模板会把原来的格式隐藏掉
      }
    })
  }
  //  筛选按钮
  $('#form-search').on('subnit', function (e) {
    e.preventDefault()
    var cate_id = $('[name=cate_id]').val()
    var state = $('[name=state]').val()
    q.cate_id = ate_id
    q.state = state
    initTable()
  })
  //编辑与删除模块

  $('tbody').on('click', '.btn-delete', function () {
    var id = $(this).attr("data-id")
    var len = $('.btn-delete').length
    layer.confirm('是否删除', { icon: 3, title: '提示' }, function (index) {
      $.ajax({
        method: 'GET',
        url: '/my/article/delete/' + id,
        success: function (res) {
          if (res.status !== 0) return layer.msg('失败')
          layer.msg('成功')
          initTable()
        }
      })
      layer.close(index);
      if (len == 0) {
        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
      }
      initTable()
    });

  })
  $('tbody').on('click', '.btn-edit', function () {
    // 获取到文章的 id
    var id = $(this).attr('data-id')
    console.log(id);
    location.href = '/article/art_edit.html?id=' + id
  })
  // $('tbody').on('click', '.btn-edit', function () {
  //   var id = $(this).attr("data-id")
  //   location.href = './art_pub.html'
  // })

  //分页功能模块
  var laypage = layui.laypage;
  function renderPage(total) {
    laypage.render({
      elem: 'test1',
      count: total,
      limit: q.pagesize,
      limits: [1, 2, 3, 4, 5],
      layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
      curr: q.pagenum,
      jump: function (obj, first) {
        q.pagesize = obj.limit
        q.pagenum = obj.curr
        if (!first) {
          initTable()
        }
      }
    })
  }
})