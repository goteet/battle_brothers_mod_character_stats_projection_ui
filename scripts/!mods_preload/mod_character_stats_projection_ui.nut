::mods_registerMod("mod_character_stats_projection_ui", 1, "Display the Projected stats of Lv11 in CharacterStats UI");

::mods_queue("mod_character_stats_projection_ui", null, function() {
	
	local range_3 = [1.8,2.3,3,3.3];
	local range_4 = [2.8,3.3,4,4.3];
	local range_5 = [3.8,4.3,5,5.3];

	::mods_hookNewObject("ui/global/data_helper", function(data_helper)
	{
		local addStatsToUIData = ::mods_getMember(data_helper, "addStatsToUIData");
		local addStatsToUIData_ = function( _entity, _target )
		{

			addStatsToUIData(_entity, _target);

			local manhunter_origin = ("State" in this.World) && this.World.State != null && this.World.Assets.getOrigin().getID() == "scenario.manhunters";
			local is_slave = manhunter_origin && _entity.getBackground().getID() == "background.slave";
			local max_level = is_slave ? 7 : 11;

			local rest_level = max_level - _entity.getLevel() + _entity.getLevelUps();
			local talents = _entity.getTalents();

			local proj =  _target.hitpointsMax + range_4[_target.hitpointsTalent] * rest_level;
			_target.hitpointsProj <- this.Math.floor(proj);

			proj =  _target.fatigueMax + range_4[_target.fatigueTalent] * rest_level;
			_target.fatigueProj <- this.Math.floor(proj);

			proj =  _target.initiative + range_5[_target.initiativeTalent] * rest_level;
			_target.initiativeProj <- this.Math.floor(proj);
			
			proj =  _target.bravery + range_4[_target.braveryTalent] * rest_level;
			_target.braveryProj <- this.Math.floor(proj);

			proj =  _target.meleeSkill + range_3[_target.meleeSkillTalent] * rest_level;
			_target.meleeSkillProj <- this.Math.floor(proj);
			
			proj =  _target.rangeSkill + range_4[_target.rangeSkillTalent] * rest_level;
			_target.rangeSkillProj <- this.Math.floor(proj);
			
			proj =  _target.meleeDefense + range_3[_target.meleeDefenseTalent] * rest_level;
			_target.meleeDefenseProj <- this.Math.floor(proj);
			
			proj =  _target.rangeDefense + range_4[_target.rangeDefenseTalent] * rest_level;
			_target.rangeDefenseProj <- this.Math.floor(proj);
		};
		::mods_override(data_helper, "addStatsToUIData", addStatsToUIData_);
	});
});

::mods_registerJS("mod_character_stats_projection_ui.js")
::mods_registerCSS("mod_character_stats_projection_ui.css")