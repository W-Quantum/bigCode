$(function () {
  var layer = layui.layer
  var form = layui.form
  form.verify({
    Pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    newPwd: function (value) {
      if (value == $('[name=oldPwd]').val()) {
        return '两次密码不能一致'
      }
    },
    regPwd: function (value) {
      if (value !== $('[name=newPwd]').val()) {
        return '两次密码不能一致'
      }
    }
  });
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/updatepwd',
      data: {
        oldPwd: $('[name=oldPwd]').val(),
        newPwd: $('[name=newPwd]').val()
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('失败')
        }
        layer.msg(res.message)
      }
    })
  })
})