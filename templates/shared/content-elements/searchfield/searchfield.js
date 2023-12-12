import Alpine from 'alpinejs';

Alpine.data('searchfield', () => ({
    form:null,
    init(){
        this.form = this.$root;
    },
    submitForm(){
        super.submitForm()
        this.form.submit();
    }
}));