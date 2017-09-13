package com.sys.org.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Pincode.
 */
@Entity
@Table(name = "pincode")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Pincode implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "pincode")
    private String pincode;

    @ManyToOne
    private PremisesBuildingVillage premisesBuildingVillage;

    @OneToMany(mappedBy = "pincode")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<AddressInformation> addressInfos = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPincode() {
        return pincode;
    }

    public Pincode pincode(String pincode) {
        this.pincode = pincode;
        return this;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public PremisesBuildingVillage getPremisesBuildingVillage() {
        return premisesBuildingVillage;
    }

    public Pincode premisesBuildingVillage(PremisesBuildingVillage premisesBuildingVillage) {
        this.premisesBuildingVillage = premisesBuildingVillage;
        return this;
    }

    public void setPremisesBuildingVillage(PremisesBuildingVillage premisesBuildingVillage) {
        this.premisesBuildingVillage = premisesBuildingVillage;
    }

    public Set<AddressInformation> getAddressInfos() {
        return addressInfos;
    }

    public Pincode addressInfos(Set<AddressInformation> addressInformations) {
        this.addressInfos = addressInformations;
        return this;
    }

    public Pincode addAddressInfos(AddressInformation addressInformation) {
        this.addressInfos.add(addressInformation);
        addressInformation.setPincode(this);
        return this;
    }

    public Pincode removeAddressInfos(AddressInformation addressInformation) {
        this.addressInfos.remove(addressInformation);
        addressInformation.setPincode(null);
        return this;
    }

    public void setAddressInfos(Set<AddressInformation> addressInformations) {
        this.addressInfos = addressInformations;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Pincode pincode = (Pincode) o;
        if (pincode.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), pincode.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Pincode{" +
            "id=" + getId() +
            ", pincode='" + getPincode() + "'" +
            "}";
    }
}
