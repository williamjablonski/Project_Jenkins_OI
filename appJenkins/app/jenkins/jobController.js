(function() {
  angular.module('primeiraApp').controller('JobCtrl', ['$http', '$location', 'msgs', 'consts',
      JobController
  ])

  function JobController($http, $location, msgs,  consts) {
      const vm = this
      const url = `${consts.apiUrl}/job/createJob`
      vm.refresh = function() {

          vm.job ={
            os: {
              linux: true,
              windows: true,
            },
            rec: true
          }
          // 
      }

      vm.checkYes = function() {
        vm.job.parametros = [{}]
        const opt = document.querySelector('#options');
        const param = document.querySelector('#param');
        opt.classList.add('animate__animated', 'animate__zoomOutDown');
        opt.addEventListener('animationend', () => {
        $('#opt').css('display', 'none')
        $('#param').css('display', '')
        param.classList.add('animate__animated', 'animate__rotateInDownLeft');
        
        });
    }
      vm.addNewParametro = function (index) {
        vm.job.parametros.splice(index + 1, 0, {})
      }
      vm.deleteParametro = function (index) {
        if (vm.job.parametros.length > 1) {
          vm.job.parametros.splice(index, 1)
        }
      }

      vm.viewDefault = function (index) {
        vm.index = index
        vm.jobSelected = vm.job.parametros[vm.index]
        if(vm.jobSelected.tipo){
          $('#defaultModel').modal('show')
        }
      }
      vm.confirmDefaults = function(){
         vm.job.parametros[vm.index] = vm.jobSelected
         $('#defaultModel').modal('hide');

      }

      vm.createJob = function(){
        $http.post(url, vm.job).then(function (response) {
          if(response.data.status =="sucesso"){          
            vm.refresh()
            msgs.addSuccess('Job Criado com sucesso!')
            setTimeout(function(){
              window.location.reload();
            },800)
          }
          if(response.data.status =="exists"){
            msgs.addPlan('Job já existe no Jenkins...')
          }
          if(response.data.status =="erro"){
            msgs.addError('Algo de errado')
            console.log(response.data.result)
          }
        })
      }

      


         vm.selectItem = function(){
                $('#exampleModalCenter').modal('show');
        }
     
      vm.refresh()
  }
})()