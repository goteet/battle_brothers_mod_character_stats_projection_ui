ProgressbarValueIdentifier.HitpointsProj 	= 'hitpointsProj';
ProgressbarValueIdentifier.FatigueProj 		= 'fatigueProj';
ProgressbarValueIdentifier.BraveryProj 		= 'braveryProj';
ProgressbarValueIdentifier.InitiativeProj 	= 'initiativeProj';
ProgressbarValueIdentifier.MeleeSkillProj 	= 'meleeSkillProj';
ProgressbarValueIdentifier.RangeSkillProj 	= 'rangeSkillProj';
ProgressbarValueIdentifier.MeleeDefenseProj = 'meleeDefenseProj';
ProgressbarValueIdentifier.RangeDefenseProj = 'rangeDefenseProj';


CharacterScreenStatsModule.prototype.setProgressbarValues_ = CharacterScreenStatsModule.prototype.setProgressbarValues;
CharacterScreenStatsModule.prototype.setProgressbarValues = function(_data)
{
	this.setProgressbarValues_(_data);
	this.setProgressbarValueWithProj(this.mLeftStatsRows.Hitpoints.Progressbar, _data, ProgressbarValueIdentifier.Hitpoints, ProgressbarValueIdentifier.HitpointsMax, ProgressbarValueIdentifier.HitpointsProj);
	this.setProgressbarValueWithProj(this.mLeftStatsRows.Fatigue.Progressbar, _data, ProgressbarValueIdentifier.Fatigue, ProgressbarValueIdentifier.FatigueMax, ProgressbarValueIdentifier.FatigueProj);
	this.setProgressbarValueWithProj(this.mLeftStatsRows.Bravery.Progressbar, _data, ProgressbarValueIdentifier.Bravery, ProgressbarValueIdentifier.BraveryMax, ProgressbarValueIdentifier.BraveryProj);
    this.setProgressbarValueWithProj(this.mLeftStatsRows.Initiative.Progressbar, _data, ProgressbarValueIdentifier.Initiative, ProgressbarValueIdentifier.InitiativeMax, ProgressbarValueIdentifier.InitiativeProj);
	
	this.setProgressbarValueWithProj(this.mMiddleStatsRows.MeleeSkill.Progressbar, _data, ProgressbarValueIdentifier.MeleeSkill, ProgressbarValueIdentifier.MeleeSkillMax, ProgressbarValueIdentifier.MeleeSkillProj);
    this.setProgressbarValueWithProj(this.mMiddleStatsRows.RangeSkill.Progressbar, _data, ProgressbarValueIdentifier.RangeSkill, ProgressbarValueIdentifier.RangeSkillMax, ProgressbarValueIdentifier.RangeSkillProj);
    this.setProgressbarValueWithProj(this.mMiddleStatsRows.MeleeDefense.Progressbar, _data, ProgressbarValueIdentifier.MeleeDefense, ProgressbarValueIdentifier.MeleeDefenseMax, ProgressbarValueIdentifier.MeleeDefenseProj);
    this.setProgressbarValueWithProj(this.mMiddleStatsRows.RangeDefense.Progressbar, _data, ProgressbarValueIdentifier.RangeDefense, ProgressbarValueIdentifier.RangeDefenseMax, ProgressbarValueIdentifier.RangeDefenseProj);
}

CharacterScreenStatsModule.prototype.setProgressbarValue_ = CharacterScreenStatsModule.prototype.setProgressbarValue;
CharacterScreenStatsModule.prototype.setProgressbarValue = function (_progressbarDiv, _data, _valueKey, _valueMaxKey, _labelKey)
{
	this.setProgressbarValue_(_progressbarDiv, _data, _valueKey, _valueMaxKey, _labelKey);
    if (_valueKey in _data && _data[_valueKey] !== null && _valueMaxKey in _data && _data[_valueMaxKey] !== null)
    {
        _progressbarDiv.changeProgressbarPreviewWidth(_data[_valueKey], _data[_valueMaxKey], false);
	}
}

CharacterScreenStatsModule.prototype.setProgressbarValueWithProj = function (_progressbarDiv, _data, _valueKey, _valueMaxKey, _valueProjKey)
{
	switch(_valueKey)
	{
		case ProgressbarValueIdentifier.Hitpoints:
		case ProgressbarValueIdentifier.Fatigue:
		{
			_progressbarDiv.changeProgressbarLabel('' + _data[_valueKey] + ' / ' + _data[_valueMaxKey] + ' (' + _data[_valueProjKey] + ')');
		} break;
		
		default:
		{
			_progressbarDiv.changeProgressbarLabel('' + _data[_valueKey] + ' (' + _data[_valueProjKey] + ')');
			_progressbarDiv.changeProgressbarPreviewWidth(_data[_valueKey], _data[_valueMaxKey], false);
			_progressbarDiv.changeProgressbarNormalWidth(_data[_valueProjKey], _data[_valueMaxKey], false);
		} break;
	}
};


CharacterScreenStatsModule.prototype.createRowsDIV_ = CharacterScreenStatsModule.prototype.createRowsDIV;
CharacterScreenStatsModule.prototype.createRowsDIV = function (_definitions, _parentDiv)
{
	$.each(_definitions, function (_key, _value)
	{
		_value.Row = $('<div class="stats-row"/>');
		_parentDiv.append(_value.Row);
		var leftStatsRowLayout = $('<div class="l-stats-row"/>');
		_value.Row.append(leftStatsRowLayout);

		var statsRowIconLayout = $('<div class="l-stats-row-icon-column"/>');
		leftStatsRowLayout.append(statsRowIconLayout);
		var statsRowIcon = $('<img/>');
		statsRowIcon.attr('src', _value.IconPath);
		statsRowIconLayout.append(statsRowIcon);

		var statsRowProgressbarLayout = $('<div class="l-stats-row-progressbar-column"/>');
		leftStatsRowLayout.append(statsRowProgressbarLayout);
		var statsRowProgressbarContainer = $('<div class="stats-progressbar-container"/>');
		statsRowProgressbarLayout.append(statsRowProgressbarContainer);

		_value.Progressbar = statsRowProgressbarContainer.createProgressbar(false, _value.StyleName);

		_value.Talent = $('<img class="talent"/>');
		statsRowIconLayout.append(_value.Talent);
	});
};