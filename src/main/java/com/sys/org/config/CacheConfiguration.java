package com.sys.org.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
@AutoConfigureAfter(value = { MetricsConfiguration.class })
@AutoConfigureBefore(value = { WebConfigurer.class, DatabaseConfiguration.class })
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.sys.org.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.sys.org.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.sys.org.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.sys.org.domain.RegistrationInformation.class.getName(), jcacheConfiguration);
            cm.createCache(com.sys.org.domain.RegistrationInformation.class.getName() + ".basicInfos", jcacheConfiguration);
            cm.createCache(com.sys.org.domain.RegistrationInformation.class.getName() + ".contactInfos", jcacheConfiguration);
            cm.createCache(com.sys.org.domain.RegistrationInformation.class.getName() + ".addressInfos", jcacheConfiguration);
            cm.createCache(com.sys.org.domain.BasicInformation.class.getName(), jcacheConfiguration);
            cm.createCache(com.sys.org.domain.BasicInformation.class.getName() + ".contactPersons", jcacheConfiguration);
            cm.createCache(com.sys.org.domain.AddressInformation.class.getName(), jcacheConfiguration);
            cm.createCache(com.sys.org.domain.CenterLocation.class.getName(), jcacheConfiguration);
            cm.createCache(com.sys.org.domain.CenterLocation.class.getName() + ".regInfos", jcacheConfiguration);
            cm.createCache(com.sys.org.domain.RegistrationType.class.getName(), jcacheConfiguration);
            cm.createCache(com.sys.org.domain.RegistrationType.class.getName() + ".regInfos", jcacheConfiguration);
            cm.createCache(com.sys.org.domain.Person.class.getName(), jcacheConfiguration);
            cm.createCache(com.sys.org.domain.Salutation.class.getName(), jcacheConfiguration);
            cm.createCache(com.sys.org.domain.Salutation.class.getName() + ".persons", jcacheConfiguration);
            cm.createCache(com.sys.org.domain.ResidentialStatus.class.getName(), jcacheConfiguration);
            cm.createCache(com.sys.org.domain.ResidentialStatus.class.getName() + ".basicInfos", jcacheConfiguration);
            cm.createCache(com.sys.org.domain.MaritalStatus.class.getName(), jcacheConfiguration);
            cm.createCache(com.sys.org.domain.MaritalStatus.class.getName() + ".basicInfos", jcacheConfiguration);
            cm.createCache(com.sys.org.domain.Gender.class.getName(), jcacheConfiguration);
            cm.createCache(com.sys.org.domain.Gender.class.getName() + ".basicInfos", jcacheConfiguration);
            cm.createCache(com.sys.org.domain.Occupation.class.getName(), jcacheConfiguration);
            cm.createCache(com.sys.org.domain.Occupation.class.getName() + ".employers", jcacheConfiguration);
            cm.createCache(com.sys.org.domain.Occupation.class.getName() + ".basicInfos", jcacheConfiguration);
            cm.createCache(com.sys.org.domain.Employers.class.getName(), jcacheConfiguration);
            cm.createCache(com.sys.org.domain.Employers.class.getName() + ".basicInfos", jcacheConfiguration);
            cm.createCache(com.sys.org.domain.OrganisationType.class.getName(), jcacheConfiguration);
            cm.createCache(com.sys.org.domain.OrganisationType.class.getName() + ".basicInfos", jcacheConfiguration);
            cm.createCache(com.sys.org.domain.Sector.class.getName(), jcacheConfiguration);
            cm.createCache(com.sys.org.domain.Sector.class.getName() + ".basicInfos", jcacheConfiguration);
            cm.createCache(com.sys.org.domain.Designation.class.getName(), jcacheConfiguration);
            cm.createCache(com.sys.org.domain.Designation.class.getName() + ".contactPersons", jcacheConfiguration);
            cm.createCache(com.sys.org.domain.ContactType.class.getName(), jcacheConfiguration);
            cm.createCache(com.sys.org.domain.ContactType.class.getName() + ".contactInfos", jcacheConfiguration);
            cm.createCache(com.sys.org.domain.ContactInfo.class.getName(), jcacheConfiguration);
            cm.createCache(com.sys.org.domain.ContactPerson.class.getName(), jcacheConfiguration);
            cm.createCache(com.sys.org.domain.ContactPerson.class.getName() + ".contactInfos", jcacheConfiguration);
            cm.createCache(com.sys.org.domain.AddressType.class.getName(), jcacheConfiguration);
            cm.createCache(com.sys.org.domain.AddressType.class.getName() + ".addressInfos", jcacheConfiguration);
            cm.createCache(com.sys.org.domain.AddressFor.class.getName(), jcacheConfiguration);
            cm.createCache(com.sys.org.domain.AddressFor.class.getName() + ".addressInfos", jcacheConfiguration);
            cm.createCache(com.sys.org.domain.State.class.getName(), jcacheConfiguration);
            cm.createCache(com.sys.org.domain.State.class.getName() + ".cityDistrictTowns", jcacheConfiguration);
            cm.createCache(com.sys.org.domain.CityDistrictTown.class.getName(), jcacheConfiguration);
            cm.createCache(com.sys.org.domain.CityDistrictTown.class.getName() + ".areaNames", jcacheConfiguration);
            cm.createCache(com.sys.org.domain.AreaName.class.getName(), jcacheConfiguration);
            cm.createCache(com.sys.org.domain.AreaName.class.getName() + ".policeStations", jcacheConfiguration);
            cm.createCache(com.sys.org.domain.AreaType.class.getName(), jcacheConfiguration);
            cm.createCache(com.sys.org.domain.AreaType.class.getName() + ".areaNames", jcacheConfiguration);
            cm.createCache(com.sys.org.domain.PoliceStation.class.getName(), jcacheConfiguration);
            cm.createCache(com.sys.org.domain.PoliceStation.class.getName() + ".postOffices", jcacheConfiguration);
            cm.createCache(com.sys.org.domain.PostOffice.class.getName(), jcacheConfiguration);
            cm.createCache(com.sys.org.domain.PostOffice.class.getName() + ".premisesBuildingVillages", jcacheConfiguration);
            cm.createCache(com.sys.org.domain.PremisesBuildingVillage.class.getName(), jcacheConfiguration);
            cm.createCache(com.sys.org.domain.PremisesBuildingVillage.class.getName() + ".pincodes", jcacheConfiguration);
            cm.createCache(com.sys.org.domain.Pincode.class.getName(), jcacheConfiguration);
            cm.createCache(com.sys.org.domain.Pincode.class.getName() + ".addressInfos", jcacheConfiguration);
            cm.createCache(com.sys.org.domain.RegistrationInformation.class.getName() + ".tickets", jcacheConfiguration);
            cm.createCache(com.sys.org.domain.Ticket.class.getName(), jcacheConfiguration);
            cm.createCache(com.sys.org.domain.TicketStatus.class.getName(), jcacheConfiguration);
            cm.createCache(com.sys.org.domain.TicketStatus.class.getName() + ".tickets", jcacheConfiguration);
            cm.createCache(com.sys.org.domain.ConfigParameter.class.getName(), jcacheConfiguration);
            cm.createCache(com.sys.org.domain.AddressInformation.class.getName() + ".addressFors", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
