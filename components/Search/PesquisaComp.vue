<template>
    <div class="card-body" style="align-left">
        <h4>{{ componentTitle }}</h4>
        <hr />
        <div class="input-group mb-3 pesquisa" >
            <hr />
            <div class="pesquisa" v-for="(field, key) in searchFields" :key="key">
                <input :type="field.type" 
                class="form-control" 
                :placeholder="field.label" 
                v-model="form[field.key]"
                    aria-label="Recipient's username" 
                    aria-describedby="basic-addon2" 
                />
                <div v-if="searchFields.length === key + 1" class="input-group-append">
                    <b-button 
                        :disabled="button.disabled" 
                        @click="onclick">
                        {{
                            button.message
                        }}
                    </b-button>
                </div>
            </div>
        </div>
        <div v-if="filtered" class="text-right">
            <b-button @click="clear" variant="link" size="sm">Limpar pesquisa</b-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PesquisaComp',
    props: {
        componentTitle: {
            type: String,
            default: 'Pesquisar',
        },
        searchFields: {
            type: Array,
            default: () => [],
        },
        getAction: {
            type: String,
        },
    },
    data() {
        return {
            form: {},
            button: {
                disabled: false,
                message: 'Procurar',
            },
            filtered: false,
        }
    },

    methods: {
        async onclick() {
            this.button.disabled = true
            this.button.message = 'Pesquisando...'

            await this.$store.dispatch(this.getAction, this.form)
            // await this.getCars(this.form)

            this.button.disabled = false
            this.button.message = 'Pesquisar'

            this.filtered = true
        },
        async clear() {
            // await this.getCars()
            await this.$store.dispatch(this.getAction)

            this.filtered = false
        },
    },
}
</script>

<style>

.pesquisa{
    display: flex;
    align-items: stretch;

}

</style>
