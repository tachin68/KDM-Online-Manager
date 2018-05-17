<template>
	<md-tab :md-label="row.Name">
        <div class="ui grid phone-viewport">
            <div class="mobile sixteen wide column computer eight wide column">
				<!-- <md-layout md-gutter style="margin-top:1rem;"> -->
				<div class="ui stackable hover six item labeled icon menu">
					<a v-for="(value, key) in row.temporary_stats" @click="className(key)" class="item" style="text-decoration: none;">
						<p>{{ (row[key] + value.gear + value.token.plus) - value.token.minus }}</p>
						{{ key }}
					</a>
				</div>
			</div>
            <div class="mobile sixteen wide column computer eight wide column">
                <md-layout md-gutter style="margin-top:1rem;">
                    <div :class="{ 'ui right labeled left action right action input': true, 'disabled': !row.Spend }">
                        <label style="background-color:#424242;width:80px;color: rgba(255, 255, 255, .87);" class="ui label">Survial</label>
                        <button @click="editStats('Survial', '+')" style="background-color:#1e88e5;color: rgba(255, 255, 255, .87);" :class="{'ui blue icon button small': true, 'disabled': !row.Spend}"><i class="plus icon"></i></button>
                        <input style="width:100px;text-align: center;" v-model="row.Survial" placeholder="Def" type="text">
                        <button @click="editStats('Survial', '-')" style="background-color:#f44336;color: rgba(255, 255, 255, .87);" :class="{'ui icon button small': true, 'disabled': !row.Spend}"><i class="minus icon"></i></button>
                    </div>
                    <button @click="editBoolean('Spend')" style="border-radius: 0 2px 2px 0;background-color:#424242;color: rgba(255, 255, 255, .87);" class="ui button tiny">{{ !row.Spend ? "Can't spend" : 'Spend' }}</button>
                </md-layout>

                <md-layout md-gutter style="margin-top:1rem;">
                    <div class="ui right labeled left action right action input">
                        <label style="background-color:#424242;width:80px;color: rgba(255, 255, 255, .87);" class="ui label">Insanity</label>
                        <button @click="editStats('Insanity', '+')" style="background-color:#1e88e5;color: rgba(255, 255, 255, .87);" class="ui blue icon button small"><i class="plus icon"></i></button>
                        <input style="width:100px;text-align: center;" v-model="row.Insanity" placeholder="Def" type="text">
                        <button @click="editStats('Insanity', '-')" style="background-color:#f44336;color: rgba(255, 255, 255, .87);" class="ui icon button small"><i class="minus icon"></i></button>
                    </div>
                </md-layout>

                <md-layout md-gutter style="margin-top:1rem;">
                    <div class="ui right labeled left action right action input">
                        <label style="background-color:#424242;width:80px;color: rgba(255, 255, 255, .87);" class="ui label">Bleeding</label>
                        <button @click="editStats('Bleeding', '+')" style="background-color:#1e88e5;color: rgba(255, 255, 255, .87);" class="ui blue icon button small"><i class="plus icon"></i></button>
                        <input style="width:100px;text-align: center;" v-model="row.Bleeding" placeholder="Def" type="text">
                        <button @click="editStats('Bleeding', '-')" style="background-color:#f44336;color: rgba(255, 255, 255, .87);" class="ui icon button small"><i class="minus icon"></i></button>
                    </div>
                </md-layout>

                <md-layout md-gutter v-for="key in btnEditDef" style="margin-top:1rem;">
                    <md-layout md-flex-xsmall="55" md-flex-small="60" md-flex-medium="80" md-flex-large="40" md-flex-xlarge="40">
                        <div class="ui right labeled left action right action input">
                            <label style="background-color:#424242;width:80px;color: rgba(255, 255, 255, .87);" class="ui label">{{ key }}</label>
                            <button @click="editDef(key, '+')" style="background-color:#1e88e5;color: rgba(255, 255, 255, .87);" class="ui blue icon button small"><i class="plus icon"></i></button>
                            <input style="width:100px;text-align: center;" v-model="row.Armor[key].def" placeholder="Def" type="text">
                            <button @click="editDef(key, '-')" style="background-color:#f44336;color: rgba(255, 255, 255, .87);" class="ui icon button small"><i class="minus icon"></i></button>

                            <md-button-toggle md-theme="color" class="md-accent">
                                <md-button v-show="key != 'Head'" style="border-radius: 0 0 0 0;" class="md-icon-button md-button-toggle">
                                    <md-icon style="font-size:20px;">L</md-icon>
                                </md-button>

                                <md-button class="md-icon-button md-button-toggle">
                                    <md-icon style="font-size:20px;">H</md-icon>
                                </md-button>
                            </md-button-toggle>
                        </div>
                    </md-layout>
                </md-layout>
            </div>

			<div class="sixteen wide column">
				<h4 class="ui horizontal divider header">Understanding</h4>
			</div>
			<div style="padding:0px;" class="sixteen wide column">
				<understanding :surId="surId"></understanding>
			</div>

			<div class="sixteen wide column">
				<h4 class="ui horizontal divider header">Courage</h4>
			</div>
			<div style="padding:0px;" class="sixteen wide column">
				<courage :surId="surId"></courage>
			</div>

			<div class="sixteen wide column">
				<h4 class="ui horizontal divider header">Disorder</h4>
			</div>

			<div style="padding:0px;" class="sixteen wide column">
				<disorders :surId="surId"></disorders>
			</div>

			<div class="sixteen wide column">
				<div v-for="(value, key) in row.temporary_stats" :class="'ui tiny modal '+key+' '+surId">
					<i class="close icon"></i>
					<div class="header" style="text-align: center;">{{ key }}</div>
					<div class="actions" style="text-align: center;">
						<div class="ui grid">
							<div class="sixteen wide column">
								<div class="ui right labeled left action right action input">
									<label style="background-color:#424242;width:90px;color: rgba(255, 255, 255, .87);" class="ui label">Base</label>
									<button @click="editStats(key, '+')" style="background-color:#1e88e5;color: rgba(255, 255, 255, .87);" class="ui blue icon button small"><i class="plus icon"></i></button>
									<input style="width:100px;text-align: center;" v-model="row[key]" placeholder="Def" type="text">
									<button @click="editStats(key, '-')" style="background-color:#f44336;color: rgba(255, 255, 255, .87);" class="ui icon button small"><i class="minus icon"></i></button>
								</div>
							</div>
							<div class="sixteen wide column">
								<div class="ui right labeled left action right action input">
									<label style="background-color:#424242;width:90px;color: rgba(255, 255, 255, .87);" class="ui label">Gear</label>
									<button @click="gearValue(value, key, '+')" style="background-color:#1e88e5;color: rgba(255, 255, 255, .87);" class="ui blue icon button small"><i class="plus icon"></i></button>
									<input style="width:100px;text-align: center;" v-model="value.gear" placeholder="Def" type="text">
									<button @click="gearValue(value, key, '-')" style="background-color:#f44336;color: rgba(255, 255, 255, .87);" class="ui icon button small"><i class="minus icon"></i></button>
								</div>
							</div>
						</div>
						<div class="ui divider"></div>
						<div class="ui grid">
							<div class="sixteen wide column">
								<div class="ui right labeled left action right action input">
									<label style="background-color:#424242;width:90px;color: rgba(255, 255, 255, .87);" class="ui label">Token +</label>
									<button @click="tokenPlusValue(value, key, '+')" style="background-color:#1e88e5;color: rgba(255, 255, 255, .87);" class="ui blue icon button small"><i class="plus icon"></i></button>
									<input style="width:100px;text-align: center;" v-model="value.token.plus" placeholder="Def" type="text">
									<button @click="tokenPlusValue(value, key, '-')" style="background-color:#f44336;color: rgba(255, 255, 255, .87);" class="ui icon button small"><i class="minus icon"></i></button>
								</div>
							</div>
							<div class="sixteen wide column">
								<div class="ui right labeled left action right action input">
									<label style="background-color:#424242;width:90px;color: rgba(255, 255, 255, .87);" class="ui label">Token -</label>
									<button @click="tokenMinusValue(value, key, '+')" style="background-color:#1e88e5;color: rgba(255, 255, 255, .87);" class="ui blue icon button small"><i class="plus icon"></i></button>
									<input style="width:100px;text-align: center;" v-model="value.token.minus" placeholder="Def" type="text">
									<button @click="tokenMinusValue(value, key, '-')" style="background-color:#f44336;color: rgba(255, 255, 255, .87);" class="ui icon button small"><i class="minus icon"></i></button>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
        </div>
	</md-tab>

</template>

<script>

	import { mapState } from 'vuex'

	import understanding from '../survivor/understanding.vue'
	import courage from '../survivor/courage.vue'
	import disorders from '../survivor/disorders.vue'

	export default {

        props: ['row', 'surId'],

		data () {
			return {
                btnEditDef: {
                    'Head': 'Head',
                    'Body': 'Body',
                    'Arms': 'Arms',
                    'Waist': 'Waist',
                    'Legs': 'Legs'
                }
			}
		},

		computed:
		{
			...mapState(['auth'])
		},

		mounted ()
		{
		},

		methods:
		{
			className(name) {
				$('.ui.tiny.modal.'+name+'.'+this.surId).modal('show')
			},

            editBoolean(key)
            {
                this.row[key] = !this.row[key]
            },

			gearValue(row, key, type)
			{
				(type === '+') ? (row.gear += 1) : (row.gear -= 1)
			},

			tokenPlusValue(row, key, type)
			{
				(type === '+') ? (row.token.plus += 1) : (row.token.plus -= 1)
			},

			tokenMinusValue(row, key, type)
			{
				(type === '+') ? (row.token.minus += 1) : (row.token.minus -= 1)
			},

            editStats(key, type)
            {
                (type === '+') ? (this.row[key] += 1) : (this.row[key] -= 1)
            },

            editDef(key, type)
            {
                (type === '+') ? (this.row.Armor[key].def += 1) : (this.row.Armor[key].def -= 1)
            }
        },

		components: { understanding, courage, disorders }
	}
</script>
