<template>
	<md-tab :md-label="row.Name">
        <div class="ui grid phone-viewport">
            <div class="mobile sixteen wide column computer eight wide column">
				<!-- <md-layout md-gutter style="margin-top:1rem;"> -->
				<div class="ui stackable hover six item labeled icon menu">
					<a class="item" style="text-decoration: none;">
						<p>{{ row.Movement }}</p>
						Movement
					</a>
					<a class="item" style="text-decoration: none;">
						<p>{{ row.Accuracy }}</p>
						Accuracy
					</a>
					<a class="item" style="text-decoration: none;">
						<p>{{ row.Strength }}</p>
						Strength
					</a>
					<a class="item" style="text-decoration: none;">
						<p>{{ row.Evasion }}</p>
						Evasion
					</a>
					<a class="item" style="text-decoration: none;">
						<p>{{ row.Luck }}</p>
						Luck
					</a>
					<a class="item" style="text-decoration: none;">
						<p>{{ row.Speed }}</p>
						Speed
					</a>
				</div>
					<!-- <div class="ui horizontal segments">
						<div class="ui black center aligned segment" style="cursor:pointer;">
							<p>{{ row.Movement }}</p>
							Movement
						</div>
						<div class="ui black center aligned segment" style="cursor:pointer;">
							<p>{{ row.Accuracy }}</p>
							Accuracy
						</div>
						<div class="ui black center aligned segment" style="cursor:pointer;">
							<p>{{ row.Strength }}</p>
							Strength
						</div>
						<div class="ui black center aligned segment" style="cursor:pointer;">
							<p>{{ row.Evasion }}</p>
							Evasion
						</div>
						<div class="ui black center aligned segment" style="cursor:pointer;">
							<p>{{ row.Luck }}</p>
							Luck
						</div>
						<div class="ui black center aligned segment" style="cursor:pointer;">
							<p>{{ row.Speed }}</p>
							Speed
						</div>
					</div> -->
			    <!-- </md-layout> -->
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
                objKeys : {
					'Insanity' : 'Insanity',
					'Movement' : 'Movement',
					'Accuracy' : 'Accuracy',
					'Strength' : 'Strength',
					'Evasion' : 'Evasion',
					'Luck' : 'Luck',
					'Speed' : 'Speed'
				},
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
            editBoolean(key)
            {
                this.row[key] = !this.row[key]
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
